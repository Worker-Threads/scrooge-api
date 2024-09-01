import type { AssetType } from '../../types.d.ts';
import type { User } from '../../entities/user.d.ts';
import type { Portfolio } from '../../entities/portfolio.d.ts';
import type { PortfolioRepo } from '../../data/portfolio/types.d.ts';
import type {
  TransactionRepo,
  GeneralAnalytics,
  AnalyzedTransaction,
} from '../../data/transaction/types.d.ts';
import type { BarRepo } from '../../data/bar/types.d.ts';

interface Deps {
  portfolioRepo: PortfolioRepo;
  transactionRepo: TransactionRepo;
  barRepo: BarRepo;
}

export type GroupCriteria = 'all' | 'portfolio' | 'asset' | 'type' | 'date';
export type GroupFields = 'portfolioId' | 'type' | 'ticker' | 'timestamp';
export interface Gain24hAnalytics {
  ticker: string;
  amount: number;
  value: number;
  gain24h: number;
  profit: number;
}

export interface GroupedLineChartAnalytics {
  amount: number;
  commission: number;
  initialValue: number;
  initialValueCommissionIncluded: number;
  currentValue: number;
  growth: number;
  profit: number;
  profitCommissionIncluded: number;
  index: number;
  indexCommissionIncluded: number;
  timestamp: number;
}

export interface LineChartAnalytics {
  type: AssetType;
  ticker: string;
  portfolioTitle: string;
  amount: number;
  commission: number;
  initialValue: number;
  initialValueCommissionIncluded: number;
  currentValue: number;
  timestamp: number;
}

interface AnalyticsService {
  _getPortfolios: (user: User, portfolioId?: number) => Promise<Portfolio[]>;

  _getTransactionsList: (
    user: User,
    portfolioId?: number,
  ) => Promise<{
    portfolios: Portfolio[];
    transactions: AnalyzedTransaction[];
  }>;

  getHoldingsTable: (
    user: User,
    opts: { portfolioId?: number; grouping?: GroupCriteria },
  ) => Promise<Partial<AnalyzedTransaction>[]>;

  getHoldingsDistribution: (
    user: User,
    opts: { portfolioId?: number; grouping: GroupCriteria },
  ) => Promise<Record<string, { share: number; value: number }>>;

  get24hGainList: (
    user: User,
    portfolioId?: number,
  ) => Promise<Gain24hAnalytics[]>;

  _getAssetLineChart: (
    portfolio: Portfolio,
    schema: AssetType,
    symbol: string,
  ) => Promise<LineChartAnalytics[]>;

  getLineChart: (
    user: User,
    opts: { portfolioId?: number; grouping?: 'portfolio' | 'asset' | 'type' },
  ) => Promise<
    Record<string, (GroupedLineChartAnalytics & GeneralAnalytics)[]>
  >;
}

export function init(deps: Deps): AnalyticsService;

export function groupByCriteria(
  transactions: AnalyzedTransaction[],
  opts: { portfolios: Portfolio[] },
): Record<string, GeneralAnalytics>;
