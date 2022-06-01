import { UseCase } from '@application/contracts/usecase-contract';
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
  constructor(private usersRepository: IUsersRepository) {
    super();
  }

  async perform(data: ICreateUserRequest): Promise<ICreateUserResponseDTO> {
    const { name, email, password, confirmPassword } = data;

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error('User already exists!');
    }

    if (password !== confirmPassword) {
      throw new Error('Oops, Password does not match ConfirmPassword!');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export { CreateUserUseCase };
