type Schema = { properties: object } & any;

export interface Handler<Params = any, Result = any> {
  method: 'get' | 'post';
  access: 'none' | 'common';
  params?: string[];
  schema: Schema;
  handler: (session: object | null, params: Params) => Result;
}

export interface DomainApi {
  [key: string]: Handler;
}

export type API = Record<string, DomainApi>;
