import { IUser } from '@domain/entities/contracts/user';
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '../dtos/CreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO>;
  findByEmail(email: string): Promise<IUser>;
}

export { IUsersRepository };
