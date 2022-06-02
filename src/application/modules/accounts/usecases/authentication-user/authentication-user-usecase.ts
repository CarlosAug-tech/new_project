import { sign } from 'jsonwebtoken';

import { UseCase } from '@application/contracts/usecase-contract';
import auth from '@infra/shared/config/auth';
import { IEncryptProvider } from '@infra/container/providers/EncryptProvider/contracts/encrypt-provider';
import { AppError } from '@infra/shared/errors/app-error';
import {
  IAuthenticationUserRequestDTO,
  IAuthenticationUserResponseDTO,
} from '../../dtos/authentication-user-dto';
import { IUsersRepository } from '../../repositories/users-repository';

class AuthenticationUserUseCase extends UseCase<
  IAuthenticationUserRequestDTO,
  IAuthenticationUserResponseDTO
> {
  constructor(
    private usersRepository: IUsersRepository,
    private bcryptProvider: IEncryptProvider,
  ) {
    super();
  }

  async perform(
    data: IAuthenticationUserRequestDTO,
  ): Promise<IAuthenticationUserResponseDTO> {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User or password invalid!');
    }

    const isPasswordMatch = await this.bcryptProvider.compare(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new AppError('User or password invalid!');
    }

    const { id, name } = user;

    const token = sign({}, auth.jwt_key_secret, {
      subject: id,
      expiresIn: auth.jwt_expires_in,
    });

    return {
      user: {
        id,
        name,
        email,
      },
      token,
    };
  }
}

export { AuthenticationUserUseCase };
