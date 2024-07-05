import type { Pool } from 'pg';
import type { AssetType } from '../../types.d.ts';
import type { Ticker } from '../../entities/ticker.d.ts';

export class TickerRepo {
  getBySymbol: (table: AssetType, symbol: string) => Promise<Ticker[]>;
}

export function init(pg: Pool): TickerRepo;
