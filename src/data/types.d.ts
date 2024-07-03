import type { Pool } from 'pg';
import type { UserRepo } from './user/types.d.ts';

interface Repos {
  user: UserRepo;
}

export function init(pool: Pool): Repos;
