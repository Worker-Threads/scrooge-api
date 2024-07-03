import type { UserApi } from './user/types.d.ts';
import type { Services } from '../services/types.d.ts';

export interface Endpoint<Params, Result> {
  method: 'get' | 'post';
  access: 'none' | 'common';
  params?: string[];
  schema: { properties: object; [key: string]: any };
  handler: (session: object | null, params: Params) => Result;
}

export interface API {
  [key: string]: Endpoint<any, any>;
}

export interface APIs extends Record<string, API> {
  user: UserApi;
}

export function init(services: Services): APIs;
