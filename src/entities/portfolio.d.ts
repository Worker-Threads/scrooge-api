import type { AssetType } from '../types.d.ts';

export type PortfolioType = AssetType | 'mixed';

export interface Portfolio {
  id: number;
  userId: number;
  type: PortfolioType;
  title: string;
}
