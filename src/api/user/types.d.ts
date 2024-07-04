import * as SchemaType from 'json-schema-to-ts';
import type { API, Endpoint } from '../types.d.ts';
import type { User } from '../../entities/user.d.ts';
import type { UserService } from '../../services/user/types.js';
import * as schemas from './schemas.js';

type UserByIdParam = SchemaType.FromSchema<typeof schemas.user>;

export interface UserApi extends API {
  user: Endpoint<UserByIdParam, Promise<User>>;
}

interface Deps {
  userService: UserService;
}

export function init(deps: Deps): UserApi;
