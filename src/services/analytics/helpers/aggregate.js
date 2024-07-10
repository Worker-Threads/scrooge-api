/** @type {import('./types').aggregate} */
export const aggregate = (transactions) => {
  const aggregated = { entryVolume: 0, currentVolume: 0, profit: 0, growth: 0 };

  for (const transaction of transactions) {
    aggregated.entryVolume += transaction.entryVolume;
    aggregated.currentVolume += transaction.currentVolume;
    aggregated.profit += transaction.profit;
  }

  return {
    ...aggregated,
    growth: (aggregated.profit / aggregated.entryVolume) * 100,
  };
};
