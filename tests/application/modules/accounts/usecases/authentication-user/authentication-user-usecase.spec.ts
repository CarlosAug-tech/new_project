import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/CreateUserDTO';
import { IUsersRepository } from '@application/modules/accounts/repositories/users-repository';
import { AuthenticationUserUseCase } from '@application/modules/accounts/usecases/authentication-user/authentication-user-usecase';
import { IUser } from '@domain/entities/contracts/user';
import { IEncryptProvider } from '@infra/container/providers/EncryptProvider/contracts/encrypt-provider';

const makeUsersRepositoryStub = (): IUsersRepository => {
  class UsersRepositoryStub implements IUsersRepository {
    create(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
      throw new Error('Method not implemented.');
    }

    findByEmail(email: string): Promise<IUser> {
      const user = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_valid_email@mail.com',
        password: 'any_password',
        created_at: new Date(),
      };

      return new Promise(resolve => resolve(user));
    }
  }

  return new UsersRepositoryStub();
};

const makeEncryptProvider = (): IEncryptProvider => {
  class BcryptProviderStub implements IEncryptProvider {
    compare(password: string, password_hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true));
    }
  }

  return new BcryptProviderStub();
};

interface ISutTypes {
  sut: AuthenticationUserUseCase;
  usersRepositoryStub: IUsersRepository;
  bcryptProviderStub: IEncryptProvider;
}

const makeSut = (): ISutTypes => {
  const usersRepositoryStub = makeUsersRepositoryStub();
  const bcryptProviderStub = makeEncryptProvider();
  const sut = new AuthenticationUserUseCase(
    usersRepositoryStub,
    bcryptProviderStub,
  );

  return {
    sut,
    usersRepositoryStub,
    bcryptProviderStub,
  };
};

describe('Authentication User UseCase', () => {
  it('should not be able to authenticate a User if the Email field is not provided', async () => {
    const { sut } = makeSut();

    const credentials = {
      email: '',
      password: '1234',
    };

    await expect(sut.execute(credentials)).rejects.toThrow();
  });

  it('should not be able to authenticate a User if the Password field is not provided', async () => {
    const { sut } = makeSut();

    const credentials = {
      email: 'any_valid_email@mail.com',
      password: '',
    };

    await expect(sut.execute(credentials)).rejects.toThrow();
  });

  it('should not be able to authenticate a User if the Email not registered', async () => {
    const { sut, usersRepositoryStub } = makeSut();
    jest
      .spyOn(usersRepositoryStub, 'findByEmail')
      .mockReturnValueOnce(undefined);

    const credentials = {
      email: 'any_valid_email@mail.com',
      password: '1234',
    };

    await expect(sut.execute(credentials)).rejects.toThrow();
  });

  it('should not be able to authenticate a User if the Email not registered', async () => {
    const { sut, bcryptProviderStub } = makeSut();
    jest
      .spyOn(bcryptProviderStub, 'compare')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)));

    const credentials = {
      email: 'any_valid_email@mail.com',
      password: '1234',
    };

    await expect(sut.execute(credentials)).rejects.toThrow();
  });

  it('should be able to authenticate a User', async () => {
    const { sut } = makeSut();

    const credentials = {
      email: 'any_valid_email@mail.com',
      password: '1234',
    };

    const response = await sut.execute(credentials);

    expect(response).toHaveProperty('token');
  });
});
