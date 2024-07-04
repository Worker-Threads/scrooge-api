export type PortfolioType = 'crypto' | 'etf' | 'stock' | 'fiat' | 'mixed';

export interface Portfolio {
  id: number;
  userId: number;
  type: PortfolioType;
  title: string;
}
