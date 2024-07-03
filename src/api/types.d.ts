import type { UserApi } from './user/types.d.ts';
import type { Services } from '../services/types.d.ts';

type Schema = { properties: object } & any;

export interface Endpoint<Params = any, Result = any> {
  method: 'get' | 'post';
  access: 'none' | 'common';
  params?: string[];
  schema: Schema;
  handler: (session: object | null, params: Params) => Result;
}

export interface API {
  [key: string]: Endpoint;
}

export interface APIs extends Record<string, API> {
  user: UserApi;
}

export function init(services: Services): APIs;
