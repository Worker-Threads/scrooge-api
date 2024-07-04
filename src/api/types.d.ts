import type { Services } from '../services/types.d.ts';
import type { UserApi } from './user/types.d.ts';
import type { AuthApi } from './auth/types.d.ts';
import type { Session } from '../services/auth/types.d.ts';

export interface Endpoint<
  Params,
  Result,
  SessionGeneric extends Session | null,
> {
  method: 'get' | 'post';
  access: 'none' | 'common';
  params?: string[];
  schema: { properties: object; [key: string]: any };
  handler: (session: SessionGeneric, params: Params) => Result;
}

export type ProtectedEndpoint<Params, Result> = Endpoint<
  Params,
  Result,
  Session
>;

export type UnprotectedEndpoint<Params, Result> = Endpoint<
  Params,
  Result,
  null
>;

export interface API {
  [key: string]: Endpoint<any, any, any>;
}

export interface APIs extends Record<string, API> {
  auth: AuthApi;
  user: UserApi;
}

export function init(services: Services): APIs;
