import * as SchemaType from 'json-schema-to-ts';
import type { API, Endpoint } from '../types.d.ts';
import type { AuthService, Session } from '../../services/auth/types.js';
import * as schemas from './schemas.js';

type SignInParam = SchemaType.FromSchema<typeof schemas.signIn>;
type SignUpParam = SchemaType.FromSchema<typeof schemas.signUp>;
type VerifyParam = SchemaType.FromSchema<typeof schemas.verify>;

export interface AuthApi extends API {
  signIn: Endpoint<SignInParam, Promise<Session>>;
  signUp: Endpoint<SignUpParam, Promise<Session>>;
  verify: Endpoint<VerifyParam, Promise<Session>>;
}

interface Deps {
  authService: AuthService;
}

export function init(deps: Deps): AuthApi;
