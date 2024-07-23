import type { Pool } from 'pg';
import type { AssetType } from '../../types.d.ts';
import type { OHLC } from '../../entities/ohlc.d.ts';

export class BarRepo {
  getOhlc: (
    schema: AssetType,
    ticker: string,
    timestamp: number,
  ) => Promise<OHLC | null>;
  get24hChange: (tickers: string[]) => Promise<
    {
      type: AssetType;
      ticker: string;
      previousPrice: number;
      currentPrice: number;
      gain24h: number;
    }[]
  >;
  getHistory: (
    schema: AssetType,
    ticker: string,
    from: number,
    to?: number,
  ) => Promise<OHLC[]>;
  getFilledHistory: (
    schema: AssetType,
    ticker: string,
    from: number,
    to?: number,
  ) => Promise<OHLC[]>;
}

export function init(pg: Pool): BarRepo;
