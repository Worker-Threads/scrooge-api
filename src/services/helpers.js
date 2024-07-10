import { exception } from '../utils/exception/util.js';

/** @type {import('./types.d.ts').verifyPortfolio}*/
export const verifyPortfolio = (user, portfolio, type) => {
  if (!portfolio) throw exception.notFound('Portfolio not found');

  if (portfolio.userId !== user.id)
    throw exception.forbidden('User has no access to this portfolio');

  if (type && portfolio.type !== 'mixed' && portfolio.type !== type)
    throw exception.badRequest(
      `Type "${type}" is not assignable to portfolio with type "${portfolio.type}"`,
    );

  return portfolio;
};
