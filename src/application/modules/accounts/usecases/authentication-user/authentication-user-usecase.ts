import { UseCase } from '@application/contracts/usecase-contract';
import {
  IAuthenticationUserRequestDTO,
  IAuthenticationUserResponseDTO,
} from '../../dtos/authentication-user-dto';
import { IUsersRepository } from '../../repositories/users-repository';

class AuthenticationUserUseCase extends UseCase<
  IAuthenticationUserRequestDTO,
  IAuthenticationUserResponseDTO
> {
  constructor(private usersRepository: IUsersRepository) {
    super();
  }

  async perform(
    data: IAuthenticationUserRequestDTO,
  ): Promise<IAuthenticationUserResponseDTO> {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('User or password invalid!');
    }

    return {
      user: {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
      },
      token: 'any_token',
    };
  }
}

export { AuthenticationUserUseCase };
