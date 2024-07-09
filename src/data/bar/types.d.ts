import type { Pool } from 'pg';
import type { AssetType } from '../../types.d.ts';
import type { OHLC } from '../../entities/ohlc.d.ts';

export class BarRepo {
  getOhlc: (
    schema: AssetType,
    ticker: string,
    timestamp: number,
  ) => Promise<OHLC | null>;
}

export function init(pg: Pool): BarRepo;
