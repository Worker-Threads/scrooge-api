/**
 * @typedef {import('./types').groupByDefault} GroupByDefault
 * @typedef {import('./types').groupByPortfolio} GroupByPortfolio
 * @typedef {import('./types').GroupFunctionMap} GroupFunctionMap
 * @typedef {Record<string | number, { entryVolume: number, currentVolume: number, profit: number }>} GroupMap
 */

/** @type {GroupByDefault} */
export const groupByDefault = (transactions, opts) => {
  const { identifierField, resolveIdentifier, resolveValue } = opts;

  const rawGroupMap = transactions.reduce((groupMap, transaction) => {
    const identifier = resolveIdentifier(transaction);

    if (!groupMap[identifier])
      groupMap[identifier] = { entryVolume: 0, currentVolume: 0, profit: 0 };

    groupMap[identifier].entryVolume += transaction.entryVolume;
    groupMap[identifier].currentVolume += transaction.currentVolume;
    groupMap[identifier].profit += transaction.profit;

    return groupMap;
  }, /** @type {GroupMap} */ ({}));

  return Object.entries(rawGroupMap).map(([key, aggregated]) => {
    const { entryVolume, currentVolume, profit } = aggregated;
    const growth = ((currentVolume - entryVolume) / entryVolume) * 100;

    return {
      [identifierField]: resolveValue(key),
      entryVolume,
      currentVolume,
      growth,
      profit,
    };
  });
};

/** @type {GroupByPortfolio} */
export const groupByPortfolio = (transactions, { portfolios, ...opts }) => {
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
