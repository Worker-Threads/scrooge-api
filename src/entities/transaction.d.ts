import type { AssetType } from '../types.d.ts';

export interface AbstractTransaction {
  id: number;
  portfolioId: number;
  volume: number;
  timestamp: number;
}

export interface Transaction extends AbstractTransaction {
  ticker?: string;
  currency?: string;
  price?: number;
}

export interface TypedTransaction extends Transaction {
  type: AssetType;
}
