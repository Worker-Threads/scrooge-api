/** @type {import('./types.d.ts').init} */
export const init = ({ tickerRepo }) => ({
  list: async (type, keyword, limit) => {
    return tickerRepo.searchBySymbol(type, keyword, limit);
  },
});
