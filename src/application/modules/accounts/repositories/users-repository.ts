import { IUser } from '@domain/entities/contracts/user';

interface IUsersRepository {
  findByEmail(email: string): Promise<IUser>;
}

export { IUsersRepository };
