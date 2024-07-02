import * as SchemaType from 'json-schema-to-ts';
import type { DomainApi, Handler } from '../types.d.ts';
import { hello } from './schemas.js';

type GreetParam = SchemaType.FromSchema<typeof hello>;

export interface UserApi extends DomainApi {
  greet: Handler<GreetParam, string>;
}

export function init(): UserApi;
