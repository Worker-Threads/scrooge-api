import { exception } from '../../utils/exception/exception.js';

/** @type {import('../../types.d.ts').AssetType[]} */
const allAssetTypes = ['crypto', 'etf', 'fiat', 'stock'];

/** @type {import('./types.d.ts').init} */
export const init = ({ transactionRepo, portfolioRepo, tickerRepo }) => ({
  create: async (type, user, definition) => {
    const { id: userId } = user;
    const { portfolioId } = definition;

    const portfolio = await portfolioRepo.findOne({
      id: portfolioId,
    });

    if (!portfolio) throw exception.notFound();
    if (portfolio.userId !== userId) throw exception.forbidden();
    if (portfolio.type !== 'mixed' && portfolio.type !== type)
      throw exception.badRequest();

    const identifier = definition.currency ?? definition.ticker;
    if (!identifier) throw exception.badRequest();

    const tickers = await tickerRepo.getBySymbol(type, identifier);
    if (!tickers.length) throw exception.notFound();

    const created = await transactionRepo.create(type, definition);

    return { type, ...created };
  },

  update: async (type, user, definition) => {
    const { id: userId } = user;
    const { id, ...rest } = definition;

    const transaction = await transactionRepo.findById(type, id);
    if (!transaction) throw exception.notFound();

    const portfolio = await portfolioRepo.findOne({
      id: transaction.portfolioId,
    });
    if (!portfolio) throw exception.notFound();
    if (portfolio.userId !== userId) throw exception.forbidden();

    const updated = await transactionRepo.update(type, id, rest);

    return { type, ...updated };
  },

  findForUser: async (user) => {
    const { id: userId } = user;

    const promises = allAssetTypes.map(async (type) => {
      const trs = await transactionRepo.findForUser(type, userId);
      const trsWithType = trs.map((tr) => ({ ...tr, type }));

      return trsWithType;
    });

    const transactions = (await Promise.all(promises)).flat();

    return transactions;
  },

  findByPortfolio: async (user, portfolioId) => {
    const { id: userId } = user;

    const portfolio = await portfolioRepo.findOne({
      id: portfolioId,
    });
    if (!portfolio) throw exception.notFound();
    if (portfolio.userId !== userId) throw exception.forbidden();

    const types = portfolio.type === 'mixed' ? allAssetTypes : [portfolio.type];

    const promises = types.map(async (type) => {
      const trs = await transactionRepo.findForUser(type, userId, portfolioId);
      const trsWithType = trs.map((tr) => ({ ...tr, type }));

      return trsWithType;
    });

    const transactions = (await Promise.all(promises)).flat();

    return transactions;
  },

  remove: async (type, user, id) => {
    const { id: userId } = user;

    const transaction = await transactionRepo.findById(type, id);
    if (!transaction) throw exception.notFound();

    const portfolio = await portfolioRepo.findOne({
      id: transaction.portfolioId,
    });
    if (!portfolio) throw exception.notFound();
    if (portfolio.userId !== userId) throw exception.forbidden();

    return transactionRepo.remove(type, id);
  },
});
