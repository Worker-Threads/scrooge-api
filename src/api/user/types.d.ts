import * as SchemaType from 'json-schema-to-ts';
import type {
  API,
  ProtectedEndpoint,
  UnprotectedEndpoint,
} from '../types.d.ts';
import type { User } from '../../entities/user.d.ts';
import type { UserService } from '../../services/user/types.js';
import * as schemas from './schemas.js';

type UserByIdParam = SchemaType.FromSchema<typeof schemas.user>;
type MeParam = SchemaType.FromSchema<typeof schemas.me>;

export interface UserApi extends API {
  user: UnprotectedEndpoint<UserByIdParam, Promise<User>>;
  me: ProtectedEndpoint<MeParam, User>;
}

interface Deps {
  userService: UserService;
}

export function init(deps: Deps): UserApi;
