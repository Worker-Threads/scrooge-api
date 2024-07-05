import type { AssetType } from '../types.d.ts';

export interface AbstractTransaction {
  id: number;
  portfolioId: number;
  volume: number;
  timestamp: number;
}

export interface CryptoTransaction extends AbstractTransaction {
  ticker: string;
  price: number;
}

export interface EtfTransaction extends AbstractTransaction {
  ticker: string;
  price: number;
}

export interface StockTransaction extends AbstractTransaction {
  ticker: string;
  price: number;
}

export interface FiatTransaction extends AbstractTransaction {
  currency: string;
  price: number;
}

export type GeneralTransaction = (
  | CryptoTransaction
  | EtfTransaction
  | StockTransaction
  | FiatTransaction
) & { ticker?: string; currency?: string };

export type GeneralTransactionWithType = {
  type: AssetType;
} & GeneralTransaction;
