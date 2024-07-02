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
