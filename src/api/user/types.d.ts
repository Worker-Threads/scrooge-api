import * as SchemaType from 'json-schema-to-ts';
import type { ApiHandler } from '../types.d.ts';
import { hello } from './schemas.js';

type GreetParam = SchemaType.FromSchema<typeof hello>;

export interface UserApi {
  [key: string]: ApiHandler;
  greet: ApiHandler<GreetParam, any>;
}

export function init(): UserApi;
