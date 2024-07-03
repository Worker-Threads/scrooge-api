import * as SchemaType from 'json-schema-to-ts';
import type { API, Endpoint } from '../types.d.ts';
import type { User } from '../../entities/user.d.ts';
import type { UserService } from '../../services/user/types.js';
import * as schemas from './schemas.js';

type GreetParam = SchemaType.FromSchema<typeof schemas.greet>;
type GetByIdParam = SchemaType.FromSchema<typeof schemas.getById>;

export interface UserApi extends API {
  greet: Endpoint<GreetParam, string>;
  getById: Endpoint<GetByIdParam, Promise<User>>;
}

interface Deps {
  userService: UserService;
}

export function init(deps: Deps): UserApi;
