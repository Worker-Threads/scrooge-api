import type { Pool } from 'pg';
import type { User } from '../../entities/user.d.ts';

export class UserRepo {
  findById: (id: number) => Promise<User>;
}

export function init(pg: Pool): UserRepo;
