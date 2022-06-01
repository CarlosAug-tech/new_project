import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '../../dtos/CreateUserDTO';
import { IUsersRepository } from '../../repositories/users-repository';

interface ICreateUserRequest extends ICreateUserRequestDTO {
  confirmPassword: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequest): Promise<ICreateUserResponseDTO> {
    const { name, email, password, confirmPassword } = data;
    const requiredFields = ['name', 'email', 'password', 'confirmPassword'];

    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`This field ${field} is required!`);
      }
    }

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
