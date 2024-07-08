import { config } from '../../config.js';
import { exception } from '../../utils/exception/util.js';

/** @type {import('./types.d.ts').init} */
export const init = ({ tickerRepo }) => ({
  list: async (type, keyword, limit) => {
    return tickerRepo.searchBySymbol(type, keyword, limit);
  },

  externalList: async (type, keyword, limit) => {
    const { url } = config.collector;
    const response = await fetch(`${url}/${type}/symbolSearch/${keyword}`);
    if (response.status > 300) throw exception.serverError('Collector error.');
    const data = await response.json();

    return data.slice(0, limit ?? 10);
  },

  load: async (type, symbol) => {
    const { url } = config.collector;
    const response = await fetch(`${url}/${type}/loadTicker/${symbol}`);
    if (response.status > 300) throw exception.serverError('Collector error.');

    return response.json();
  },
});
