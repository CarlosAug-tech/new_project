import { UseCase } from '@application/contracts/usecase-contract';
import {
  IAuthenticationUserRequestDTO,
  IAuthenticationUserResponseDTO,
} from '../../dtos/authentication-user-dto';

class AuthenticationUserUseCase extends UseCase<
  IAuthenticationUserRequestDTO,
  IAuthenticationUserResponseDTO
> {
  async perform(
    data: IAuthenticationUserRequestDTO,
  ): Promise<IAuthenticationUserResponseDTO> {
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
