import * as SchemaType from 'json-schema-to-ts';
import type {
  API,
  ProtectedEndpoint,
  UnprotectedEndpoint,
} from '../types.d.ts';
import type { AuthService, Session } from '../../services/auth/types.js';
import * as schemas from './schemas.js';

type SignInParam = SchemaType.FromSchema<typeof schemas.signIn>;
type SignUpParam = SchemaType.FromSchema<typeof schemas.signUp>;
type VerifyParam = SchemaType.FromSchema<typeof schemas.verify>;

export interface AuthApi extends API {
  signIn: UnprotectedEndpoint<SignInParam, Promise<Session>>;
  signUp: UnprotectedEndpoint<SignUpParam, Promise<Session>>;
  verify: ProtectedEndpoint<VerifyParam, Promise<Session>>;
}

interface Deps {
  authService: AuthService;
}

export function init(deps: Deps): AuthApi;
