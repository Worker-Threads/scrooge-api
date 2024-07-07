/** @type {import('./types.d.ts').init} */
export const init = ({ tickerRepo }) => ({
  list: async (type) => {
    return tickerRepo.list(type);
  },
});
