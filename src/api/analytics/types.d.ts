import * as SchemaType from 'json-schema-to-ts';
import type { API, ProtectedEndpoint } from '../types.d.ts';
import type { AnalyticsService } from '../../services/analytics/types.d.ts';
import type { AggTransaction } from './../../data/transaction/types.d.ts';

import * as schemas from './schemas.js';

type GeneralParam = SchemaType.FromSchema<typeof schemas.general>;
type TableParam = SchemaType.FromSchema<typeof schemas.table>;
// type AllocationParam = SchemaType.FromSchema<typeof schemas.allocation>;
// type ChartParam = SchemaType.FromSchema<typeof schemas.chart>;

export interface AnalyticsApi extends API {
  general: ProtectedEndpoint<
    GeneralParam,
    Promise<Partial<AggTransaction | null>>
  >;
  table: ProtectedEndpoint<TableParam, Promise<Partial<AggTransaction>[]>>;
  // allocation: ProtectedEndpoint<AllocationParam, any>;
  // chart: ProtectedEndpoint<ChartParam, any>;
}

interface Deps {
  analyticsService: AnalyticsService;
}

export function init(deps: Deps): AnalyticsApi;
