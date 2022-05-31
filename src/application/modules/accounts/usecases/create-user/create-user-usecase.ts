import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '../../dtos/CreateUserDTO';

class CreateUserUseCase {
  async execute({
    name,
    email,
    password,
    confirmPassword,
  }: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    return {
      id: 'any_id',
      name,
      email,
      created_at: new Date(),
    };
  }
}

export { CreateUserUseCase };
