import { UserEntity } from '../entities/user.entity';

export interface UserResponseInterface {
  user: UserEntity & { token: string };
}
