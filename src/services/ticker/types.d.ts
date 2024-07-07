import type { AssetType } from '../../types.d.ts';
import type { Ticker } from '../../entities/ticker.d.ts';
import type { TickerRepo } from '../../data/ticker/types.d.ts';

interface Deps {
  tickerRepo: TickerRepo;
}

export interface TickerService {
  list: (type: AssetType, keyword: string, limit?: number) => Promise<Ticker[]>;
}

export function init(deps: Deps): TickerService;
