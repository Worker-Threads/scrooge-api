import * as SchemaType from 'json-schema-to-ts';
import type { API, ProtectedEndpoint } from '../types.d.ts';
import type {
  AnalyticsService,
  Gain24hAnalytics,
} from '../../services/analytics/types.d.ts';
import type { AnalyzedTransaction } from './../../data/transaction/types.d.ts';

import * as schemas from './schemas.js';

type GeneralParam = SchemaType.FromSchema<typeof schemas.general>;
type TableParam = SchemaType.FromSchema<typeof schemas.table>;
type AllocationParam = SchemaType.FromSchema<typeof schemas.allocation>;
type GainersLosersParam = SchemaType.FromSchema<typeof schemas.gainersLosers>;

export interface AnalyticsApi extends API {
  general: ProtectedEndpoint<
    GeneralParam,
    Promise<Partial<AnalyzedTransaction | null>>
  >;
  table: ProtectedEndpoint<TableParam, Promise<Partial<AnalyzedTransaction>[]>>;
  allocation: ProtectedEndpoint<
    AllocationParam,
    Promise<Record<string, number>>
  >;
  gainersLosers: ProtectedEndpoint<
    GainersLosersParam,
    Promise<Gain24hAnalytics[]>
  >;
}

interface Deps {
  analyticsService: AnalyticsService;
}

export function init(deps: Deps): AnalyticsApi;
