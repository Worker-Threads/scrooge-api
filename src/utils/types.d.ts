import type { Env } from './env/types.d.ts';
import type { Sessions } from './session/types.d.ts';
import type { Exception } from './exception/types.d.ts';
import type { Passwords } from './passwords/types.d.ts';

export interface Utils {
  env: Env;
  sessions: Sessions;
  exception: Exception;
  passwords: Passwords;
}
