export interface Handler<Params = any, Result = any> {
  method: 'get' | 'post';
  access: 'none' | 'common';
  schema: object;
  handler: (session: object | null, params: Params) => Result;
}

export interface DomainApi {
  [key: string]: Handler;
}

export type API = Record<string, DomainApi>;
