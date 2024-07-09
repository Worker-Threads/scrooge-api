import type { AssetType } from '../../types.d.ts';
import type { OHLC } from '../../entities/ohlc.d.ts';
import type { TickerRepo } from '../../data/ticker/types.d.ts';
import type { BarRepo } from '../../data/bar/types.d.ts';

interface Deps {
  tickerRepo: TickerRepo;
  barRepo: BarRepo;
}

interface BarService {
  getOhlc: (
    type: AssetType,
    ticker: string,
    timestamp: number,
  ) => Promise<OHLC | null>;
}

export function init(deps: Deps): BarService;
