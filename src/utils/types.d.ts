import type { User } from '../entities/user.d.ts';
import type { Session } from '../services/auth/types.d.ts';

export interface Env {
  requireEnv: (env: string) => string;
}

export interface Exception {
  badRequest(message?: string): void;
  unauthorized(message?: string): void;
  forbidden(message?: string): void;
  notFound(message?: string): void;
}

export interface Passwords {
  hash(password: string): string;
  compare(password: string, hash: string): boolean;
}

export interface Sessions {
  generate(payload: User): Session;
  validate(token: string): any;
}

export interface Utils {
  env: Env;
  exception: Exception;
  passwords: Passwords;
}
