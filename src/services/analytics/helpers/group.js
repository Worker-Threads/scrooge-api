/**
 * @typedef {import('./types').groupByDefault} GroupByDefault
 * @typedef {import('./types').groupByPortfolio} GroupByPortfolio
 * @typedef {import('./types').GroupFunctionMap} GroupFunctionMap
 * @typedef {import('../../../data/transaction/types').AggTransaction} AggTransaction
 * @typedef {Record<string | number, AggTransaction[]>} GroupMap
 */

import { aggregate } from './aggregate.js';

/** @type {GroupByDefault} */
const groupByDefault = (transactions, opts) => {
  const { identifierField, resolveIdentifier, resolveValue } = opts;

  const rawGroupMap = transactions.reduce((groupMap, transaction) => {
    const identifier = resolveIdentifier(transaction);
    if (!groupMap[identifier]) groupMap[identifier] = [];
    groupMap[identifier].push(transaction);

    return groupMap;
  }, /** @type {GroupMap} */ ({}));

  return Object.entries(rawGroupMap).map(([key, transactions]) => {
    const agg = aggregate(transactions);

    return {
      [identifierField]: resolveValue(key),
      ...agg,
    };
  });
};

/** @type {GroupByPortfolio} */
const groupByPortfolio = (transactions, { portfolios, ...opts }) => {
  const grouped = groupByDefault(transactions, opts);

  /** @type {Record<number, string>} */
  const portfolioTitles = portfolios.reduce(
    (map, { id, title }) => ({ ...map, [id]: title }),
    {},
  );

  grouped.forEach((row) => {
    if (row.portfolioId) row.portfolioTitle = portfolioTitles[row?.portfolioId];
  });

  return grouped;
};

/** @type {GroupFunctionMap} */
export const groupFunctionMap = {
  '*': (transactions) => {
    return [aggregate(transactions)];
  },

  portfolio: (transactions, { portfolios }) => {
    return groupByPortfolio(transactions, {
      identifierField: 'portfolioId',
      resolveIdentifier: (t) => t.portfolioId,
      resolveValue: (i) => i,
      portfolios,
    });
  },

  asset: (transactions) => {
    return groupByDefault(transactions, {
      identifierField: 'ticker',
      resolveIdentifier: (t) => t.ticker,
      resolveValue: (i) => i,
    });
  },

  type: (transactions) => {
    return groupByDefault(transactions, {
      identifierField: 'type',
      resolveIdentifier: (t) => t.type,
      resolveValue: (i) => i,
    });
  },

  date: (transactions) => {
    return groupByDefault(transactions, {
      identifierField: 'timestamp',
      resolveIdentifier: (t) => new Date(t.timestamp).getMonth(),
      resolveValue: (i) => new Date().setMonth(+i),
    });
  },
};
