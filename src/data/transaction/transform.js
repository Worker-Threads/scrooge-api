/**
 * @param {any} row
 * @param {string} type
 */
export const pgToAnalyzedRow = (row, type) => ({
  ...row,
  type,
  ticker: row.ticker ?? row.currency,
  amount: +row.amount,
  initialValue: +row.initialValue,
  currentValue: +row.currentValue,
  entryPrice: +row.price,
  currentPrice: +row.currentPrice,
  growth: +row.growth,
  profit: +row.profit,
  timestamp: new Date(row.timestamp).getTime(),
});
