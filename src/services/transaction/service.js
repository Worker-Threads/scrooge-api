import { exception } from '../../utils/exception/util.js';
import { verifyPortfolio } from '../helpers.js';

/** @type {import('../../types.d.ts').AssetType[]} */
const allAssetTypes = ['crypto', 'etf', 'fiat', 'stock'];

/** @type {import('./types.d.ts').init} */
export const init = ({ transactionRepo, portfolioRepo, tickerRepo }) => ({
  create: async (type, user, definition) => {
    const { portfolioId } = definition;

    const portfolio = await portfolioRepo.findOne({
      id: portfolioId,
    });

    verifyPortfolio(user, portfolio, type);

    const tickers = await tickerRepo.searchBySymbol(type, definition.ticker);
    if (!tickers.length) throw exception.notFound('Ticker not found');

    const created = await transactionRepo.create(type, definition);

    return { type, ...created };
  },

  update: async (type, user, definition) => {
    const { id, ...rest } = definition;

    const transaction = await transactionRepo.findById(type, id);
    if (!transaction) throw exception.notFound('Transaction not found');

    const portfolio = await portfolioRepo.findOne({
      id: transaction.portfolioId,
    });

    verifyPortfolio(user, portfolio, type);

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

    const verifiedPortfolio = verifyPortfolio(user, portfolio);

    const types =
      verifiedPortfolio.type === 'mixed'
        ? allAssetTypes
        : [verifiedPortfolio.type];

    const promises = types.map(async (type) => {
      const trs = await transactionRepo.findForUser(type, userId, portfolioId);
      const trsWithType = trs.map((tr) => ({ ...tr, type }));

      return trsWithType;
    });

    const transactions = (await Promise.all(promises)).flat();

    return transactions;
  },

  remove: async (type, user, id) => {
    const transaction = await transactionRepo.findById(type, id);
    if (!transaction) throw exception.notFound('Transaction not found');

    const portfolio = await portfolioRepo.findOne({
      id: transaction.portfolioId,
    });

    verifyPortfolio(user, portfolio);

    return transactionRepo.remove(type, id);
  },
});
