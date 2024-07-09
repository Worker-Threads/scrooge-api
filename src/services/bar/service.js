import { exception } from '../../utils/exception/util.js';

/** @type {import('./types.d.ts').init} */
export const init = ({ tickerRepo, barRepo }) => ({
  getOhlc: async (type, ticker, timestamp) => {
    const tickers = await tickerRepo.searchBySymbol(type, ticker);
    if (!tickers.length) throw exception.notFound('Ticker not found');

    return barRepo.getOhlc(type, ticker, timestamp);
  },
});
