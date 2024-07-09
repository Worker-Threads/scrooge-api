/**
 * @typedef {import('./types').groupByDefault} GroupByDefault
 * @typedef {import('./types').groupByPortfolio} GroupByPortfolio
 * @typedef {import('./types').GroupFunctionMap} GroupFunctionMap
 * @typedef {Record<string | number, { entryVolume: number, currentVolume: number, profit: number }>} GroupMap
 */

/** @type {GroupByDefault} */
export const groupByDefault = (field, transactions) => {
  const rawGroupMap = transactions.reduce((groupMap, transaction) => {
    const identifier = transaction[field];
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
      [field]: key,
      entryVolume,
      currentVolume,
      growth,
      profit,
    };
  });
};

/** @type {GroupByPortfolio} */
export const groupByPortfolio = (transactions, { portfolios }) => {
  const grouped = groupByDefault('portfolioId', transactions);

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
    return groupByPortfolio(transactions, { portfolios });
  },

  asset: (transactions) => {
    return groupByDefault('ticker', transactions);
  },

  type: (transactions) => {
    return groupByDefault('type', transactions);
  },
};
