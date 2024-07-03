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
