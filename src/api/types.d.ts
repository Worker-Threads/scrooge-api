interface Handler<Params, Result> {
  (params: Params): Result;
}

export interface ApiHandler<Params = any, Result = any> {
  method: 'get' | 'post';
  access: 'none' | 'common';
  schema: object;
  handler: Handler<Params, Result>;
}

export type API = Record<string, ApiHandler>;
