import type { User } from '../entities/user.d.ts';
import type { UserRepo } from '../data/user/types.d.ts';

export interface UserService {
  findById: (id: number) => Promise<User>;
}

export interface Init {
  user: (deps: { userRepo: UserRepo }) => UserService;
}
