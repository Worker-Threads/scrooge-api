import { verifyPortfolio } from '../helpers.js';

/** @type {import('./types.d.ts').init} */
export const init = ({ portfolioRepo }) => ({
  create: async (user, definition) => {
    const { id: userId } = user;

    return portfolioRepo.create({ userId, ...definition });
  },

  update: async (user, definition) => {
    const { id, ...rest } = definition;

    const portfolio = await portfolioRepo.findOne({ id });
    verifyPortfolio(user, portfolio);

    return portfolioRepo.update(id, rest);
  },

  findOne: async (user, definition) => {
    const portfolio = await portfolioRepo.findOne(definition);

    return verifyPortfolio(user, portfolio);
  },

  remove: async (user, id) => {
    const portfolio = await portfolioRepo.findOne({ id });
    verifyPortfolio(user, portfolio);

    return portfolioRepo.remove(id);
  },
});
