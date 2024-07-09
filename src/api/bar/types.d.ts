import * as SchemaType from 'json-schema-to-ts';
import type { API, ProtectedEndpoint } from '../types.d.ts';
import type { OHLC } from '../../entities/ohlc.d.ts';
import * as schemas from './schemas.js';
import type { BarService } from '../../services/bar/types.d.ts';

type TickersListParam = SchemaType.FromSchema<typeof schemas.ohlc>;

export interface TickerApi extends API {
  ohlc: ProtectedEndpoint<TickersListParam, Promise<OHLC | null>>;
}

interface Deps {
  barService: BarService;
}

export function init(deps: Deps): TickerApi;
