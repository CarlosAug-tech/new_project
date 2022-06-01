import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/CreateUserDTO';
import { IUsersRepository } from '@application/modules/accounts/repositories/users-repository';
import { AuthenticationUserUseCase } from '@application/modules/accounts/usecases/authentication-user/authentication-user-usecase';
import { IUser } from '@domain/entities/contracts/user';

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

interface ISutTypes {
  sut: AuthenticationUserUseCase;
  usersRepositoryStub: IUsersRepository;
}

const makeSut = (): ISutTypes => {
  const usersRepositoryStub = makeUsersRepositoryStub();
  const sut = new AuthenticationUserUseCase(usersRepositoryStub);

  return {
    sut,
    usersRepositoryStub,
  };
};

describe('Authentication User UseCase', () => {
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
