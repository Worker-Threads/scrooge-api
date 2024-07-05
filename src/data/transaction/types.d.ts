import type { Pool } from 'pg';
import type { GeneralTransaction } from '../../entities/transaction.d.ts';
import type { AssetType } from '../../types.d.ts';

export class TransactionRepo {
  create: (
    schema: AssetType,
    transaction: Omit<GeneralTransaction, 'id'>,
  ) => Promise<GeneralTransaction>;
  update: (
    schema: AssetType,
    id: number,
    definition: {
      volume?: number;
      timestamp?: number;
      price?: number;
    },
  ) => Promise<GeneralTransaction>;
  findForUser: (
    schema: AssetType,
    userId: number,
    portfolioId?: number,
  ) => Promise<GeneralTransaction[]>;
  findById: (
    schema: AssetType,
    id: number,
  ) => Promise<GeneralTransaction | null>;
  remove: (schema: AssetType, id: number) => Promise<{ removed: boolean }>;
}

export function init(pg: Pool): TransactionRepo;
