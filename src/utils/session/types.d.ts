import type { User } from '../../entities/user.d.ts';
import type { Session } from '../../services/auth/types.d.ts';

export interface Sessions {
  generate(payload: User): Session;
  validate(token: string): any;
}

export interface Jwt {
  issue(privateKey: string, payload: object, ttl: number): string;
  verify(publicKey: string, token: string): object;
  headerObject: {
    alg: string;
    typ: string;
  };
}
