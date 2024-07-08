import * as SchemaType from 'json-schema-to-ts';
import type { API, ProtectedEndpoint } from '../types.d.ts';
import type { Ticker } from '../../entities/ticker.d.ts';
import * as schemas from './schemas.js';
import type { TickerService } from '../../services/ticker/types.d.ts';

type TickersListParam = SchemaType.FromSchema<typeof schemas.tickers>;
type LoadTickerParam = SchemaType.FromSchema<typeof schemas.load>;

export interface TickerApi extends API {
  tickers: ProtectedEndpoint<TickersListParam, Promise<Ticker[]>>;
  load: ProtectedEndpoint<LoadTickerParam, Promise<{ loaded: boolean }>>;
}

interface Deps {
  tickerService: TickerService;
}

export function init(deps: Deps): TickerApi;
