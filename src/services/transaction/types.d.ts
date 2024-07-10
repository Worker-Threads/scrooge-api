import type { AssetType } from '../../types.d.ts';
import type { User } from '../../entities/user.d.ts';
import type {
  Transaction,
  TypedTransaction,
} from '../../entities/transaction.d.ts';
import type { PortfolioRepo } from '../../data/portfolio/types.d.ts';
import type { TransactionRepo } from './../../data/transaction/types.d.ts';
import type { TickerRepo } from '../../data/ticker/types.d.ts';

interface Deps {
  transactionRepo: TransactionRepo;
  portfolioRepo: PortfolioRepo;
  tickerRepo: TickerRepo;
}

export interface TransactionService {
  create: (
    type: AssetType,
    user: User,
    definition: Omit<Transaction, 'id'>,
  ) => Promise<TypedTransaction>;
  update: (
    type: AssetType,
    user: User,
    definition: {
      id: number;
      volume?: number;
      timestamp?: number;
      price?: number;
    },
  ) => Promise<TypedTransaction>;
  findForUser: (user: User) => Promise<TypedTransaction[]>;
  findByPortfolio: (
    user: User,
    portfolioId: number,
  ) => Promise<TypedTransaction[]>;
  remove: (
    type: AssetType,
    user: User,
    id: number,
  ) => Promise<{ removed: boolean }>;
}

export function init(deps: Deps): TransactionService;
