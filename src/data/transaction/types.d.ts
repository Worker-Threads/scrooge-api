import type { Pool } from 'pg';
import type {
  Transaction,
  TypedTransaction,
} from '../../entities/transaction.d.ts';
import type { AssetType } from '../../types.d.ts';

export interface GeneralAnalytics {
  amount: number;
  commission: number;
  initialValue: number;
  initialValueCommissionIncluded: number;
  currentValue: number;
  growth: number;
  profit: number;
  profitCommissionIncluded: number;
}

export interface AnalyzedTransaction
  extends TypedTransaction,
    GeneralAnalytics {
  entryPrice: number;
  currentPrice: number;
}

export class TransactionRepo {
  create: (
    schema: AssetType,
    transaction: Omit<Transaction, 'id'>,
  ) => Promise<Transaction>;
  update: (
    schema: AssetType,
    id: number,
    definition: {
      amount?: number;
      timestamp?: number;
      price?: number;
    },
  ) => Promise<Transaction>;
  findForUser: (
    schema: AssetType,
    userId: number,
    portfolioId?: number,
  ) => Promise<Transaction[]>;
  findById: (schema: AssetType, id: number) => Promise<Transaction | null>;
  remove: (schema: AssetType, id: number) => Promise<{ removed: boolean }>;
  getPortfolioTickers: (
    portfolioId: number,
  ) => Promise<Record<AssetType, string[]>>;
  getAnalyzedForTicker: (
    portfolioId: number,
    schema: AssetType,
    symbol: string,
  ) => Promise<AnalyzedTransaction[]>;
  getAnalyzedTransactions: (
    portfolioIds: number[],
  ) => Promise<AnalyzedTransaction[]>;
}

export function init(pg: Pool): TransactionRepo;
