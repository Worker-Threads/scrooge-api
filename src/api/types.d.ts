import type { Services } from '../services/types.d.ts';
import type { UserApi } from './user/types.d.ts';
import type { AuthApi } from './auth/types.d.ts';
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
  auth: AuthApi;
  user: UserApi;
}

export function init(services: Services): APIs;
