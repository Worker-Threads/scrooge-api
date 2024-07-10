import type { Pool } from 'pg';
import type {
  Transaction,
  TypedTransaction,
} from '../../entities/transaction.d.ts';
import type { AssetType } from '../../types.d.ts';

export interface GeneralAnalytics {
  entryVolume: number;
  currentVolume: number;
  growth: number;
  profit: number;
}

export interface AnalyzedTransaction
  extends TypedTransaction,
    GeneralAnalytics {
  ticker: string;
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
      volume?: number;
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
  getAnalyzedTransactions: (
    portfolioIds: number[],
  ) => Promise<AnalyzedTransaction[]>;
}

export function init(pg: Pool): TransactionRepo;
