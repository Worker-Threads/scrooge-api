import type { Pool } from 'pg';
import type { AssetType } from '../../types.d.ts';
import type { Ticker } from '../../entities/ticker.d.ts';

export class TickerRepo {
  searchBySymbol: (
    schema: AssetType,
    symbol: string,
    limit?: number,
  ) => Promise<Ticker[]>;
}

export function init(pg: Pool): TickerRepo;
