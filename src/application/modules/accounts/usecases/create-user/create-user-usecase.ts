import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '../../dtos/CreateUserDTO';

class CreateUserUseCase {
  async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const { name, email, password, confirmPassword } = data;
    const requiredFields = ['name', 'email', 'password', 'confirmPassword'];

    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`This field ${field} is required!`);
      }
    }

    return {
      id: 'any_id',
      name,
      email,
      created_at: new Date(),
    };
  }
}

export { CreateUserUseCase };
