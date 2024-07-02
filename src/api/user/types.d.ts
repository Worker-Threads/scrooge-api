import * as SchemaType from 'json-schema-to-ts';
import type { DomainApi, Handler } from '../types.d.ts';
import type { UserRepo } from '../../data/user/types.d.ts';
// import type { User } from '../../entities/user.d.ts';
import * as schemas from './schemas.js';

type GreetParam = SchemaType.FromSchema<typeof schemas.greet>;
// type GetByIdParam = SchemaType.FromSchema<typeof schemas.getById>;

export interface UserApi extends DomainApi {
  greet: Handler<GreetParam, string>;
  // getById: Handler<GetByIdParam, Promise<User>>;
}

interface Deps {
  userRepo: UserRepo;
}

export function init(deps: Deps): UserApi;
