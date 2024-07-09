import type { User } from '../../entities/user.d.ts';
import type { PortfolioRepo } from '../../data/portfolio/types.d.ts';
import type {
  AggTransaction,
  TransactionRepo,
} from '../../data/transaction/types.d.ts';
import type { GroupCriteria } from './utils/types.d.ts';

interface Deps {
  portfolioRepo: PortfolioRepo;
  transactionRepo: TransactionRepo;
}

interface AnalyticsService {
  getTransactionsTable: (
    user: User,
    portfolioId?: number,
    grouping?: GroupCriteria,
  ) => Promise<Partial<AggTransaction>[]>;
}

export function init(deps: Deps): AnalyticsService;
