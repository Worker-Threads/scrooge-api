import type { AssetType } from '../types.d.ts';

export interface Transaction {
  id: number;
  portfolioId: number;
  amount: number;
  timestamp: number;
  ticker?: string;
  currency?: string;
  price?: number;
}

export interface TypedTransaction extends Transaction {
  type: AssetType;
}
