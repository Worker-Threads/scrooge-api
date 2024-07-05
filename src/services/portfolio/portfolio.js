import { exception } from '../../utils/exception/exception.js';

/** @type {import('./types.d.ts').init} */
export const init = ({ portfolioRepo }) => ({
  create: async (user, definition) => {
    const { id: userId } = user;

    return portfolioRepo.create({ userId, ...definition });
  },

  update: async (user, definition) => {
    const { id: userId } = user;
    const { id, ...rest } = definition;

    const portfolio = await portfolioRepo.findOne({ id });
    if (!portfolio) throw exception.notFound('Portfolio not found');
    if (portfolio.userId !== userId)
      throw exception.forbidden('User has no access to this portfolio');

    return portfolioRepo.update(id, rest);
  },

  findOne: async (user, definition) => {
    const { id: userId } = user;

    const portfolio = await portfolioRepo.findOne(definition);
    if (!portfolio) throw exception.notFound('Portfolio not found');
    if (portfolio.userId !== userId)
      throw exception.forbidden('User has no access to this portfolio');

    return portfolio;
  },

  remove: async (user, id) => {
    const { id: userId } = user;

    const portfolio = await portfolioRepo.findOne({ id });
    if (!portfolio) throw exception.notFound('Portfolio not found');
    if (portfolio.userId !== userId)
      throw exception.forbidden('User has no access to this portfolio');

    return portfolioRepo.remove(id);
  },
});
