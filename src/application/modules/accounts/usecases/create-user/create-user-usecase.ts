import { UseCase } from '@application/contracts/usecase-contract';
import { IEncryptProvider } from '@infra/container/providers/EncryptProvider/contracts/encrypt-provider';
import { AppError } from '@infra/shared/errors/app-error';
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '../../dtos/CreateUserDTO';
import { IUsersRepository } from '../../repositories/users-repository';

interface ICreateUserRequest extends ICreateUserRequestDTO {
  confirmPassword: string;
}

class CreateUserUseCase extends UseCase<
  ICreateUserRequest,
  ICreateUserResponseDTO
> {
  constructor(
    private usersRepository: IUsersRepository,
    private bcryptProvider: IEncryptProvider,
  ) {
    super();
  }

  async perform(data: ICreateUserRequest): Promise<ICreateUserResponseDTO> {
    const { name, email, password, confirmPassword } = data;
    const saltHash = 12;

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists!');
    }

    if (password !== confirmPassword) {
      throw new AppError('Oops, Password does not match ConfirmPassword!');
    }

    const passwordHash = await this.bcryptProvider.hash(password, saltHash);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserUseCase };
