/**
 * @param {any} row
 * @param {string} type
 */
export const pgToAnalyzedRow = (row, type) => ({
  ...row,
  type,
  amount: +row.amount,
  commission: +row.commission,
  initialValue: +row.initialValue,
  initialValueCommissionIncluded: +row.initialValueCommissionIncluded,
  currentValue: +row.currentValue,
  entryPrice: +row.price,
  currentPrice: +row.currentPrice,
  growth: +row.growth,
  profit: +row.profit,
  profitCommissionIncluded: +row.profitCommissionIncluded,
  timestamp: new Date(row.timestamp).getTime(),
});
