import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/CreateUserDTO';
import { IUsersRepository } from '@application/modules/accounts/repositories/users-repository';
import { CreateUserUseCase } from '@application/modules/accounts/usecases/create-user/create-user-usecase';
import { IUser } from '@domain/entities/contracts/user';

const makeUsersRepositoryStub = (): IUsersRepository => {
  class UsersRepositoryStub implements IUsersRepository {
    create(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
      const user = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_valid_email@mail.com',
        created_at: new Date(),
      };

      return new Promise(resolve => resolve(user));
    }

    async findByEmail(email: string): Promise<IUser> {
      const user = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        created_at: new Date(),
      };

      return new Promise(resolve => resolve(user));
    }
  }

  return new UsersRepositoryStub();
};

interface ISutTypes {
  sut: CreateUserUseCase;
  usersRepositoryStub: IUsersRepository;
}

const makeSut = (): ISutTypes => {
  const usersRepositoryStub = makeUsersRepositoryStub();
  const sut = new CreateUserUseCase(usersRepositoryStub);

  return {
    sut,
    usersRepositoryStub,
  };
};

describe('Create User UseCase', () => {
  it('should not be able to create a new User if Name is not provided', async () => {
    const { sut } = makeSut();

    const user = {
      name: '',
      email: 'any_valid_email@mail.com',
      password: 'any_valid_password',
      confirmPassword: 'any_valid_password',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should not be able to create a new User if Email is not provided', async () => {
    const { sut } = makeSut();

    const user = {
      name: 'any_name',
      email: '',
      password: 'any_valid_password',
      confirmPassword: 'any_valid_password',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should not be able to create a new User if Password is not provided', async () => {
    const { sut } = makeSut();

    const user = {
      name: 'any_name',
      email: 'any_valid_email@mail.com',
      password: '',
      confirmPassword: 'any_valid_password',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should not be able to create a new User if ConfirmPassword is not provided', async () => {
    const { sut } = makeSut();

    const user = {
      name: 'any_name',
      email: 'any_valid_email@mail.com',
      password: 'any_valid_password',
      confirmPassword: '',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should not be able to create a new User if Password is not match ConfirmPassword', async () => {
    const { sut, usersRepositoryStub } = makeSut();
    jest
      .spyOn(usersRepositoryStub, 'findByEmail')
      .mockReturnValueOnce(undefined);

    const user = {
      name: 'any_name',
      email: 'any_valid_email@mail.com',
      password: 'any_valid_password',
      confirmPassword: 'invalid_password',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should not be able to create a new User if Email already exists', async () => {
    const { sut } = makeSut();

    const user = {
      name: 'any_name',
      email: 'any_valid_email@mail.com',
      password: 'any_valid_password',
      confirmPassword: 'any_invalid_password',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should be able to create a new User', async () => {
    const { sut, usersRepositoryStub } = makeSut();
    jest
      .spyOn(usersRepositoryStub, 'findByEmail')
      .mockReturnValueOnce(undefined);

    const user = {
      name: 'any_name',
      email: 'any_valid_email@mail.com',
      password: 'any_valid_password',
      confirmPassword: 'any_valid_password',
    };

    const response = await sut.execute(user);

    expect(response).toHaveProperty('id');
    expect(response).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_valid_email@mail.com',
      created_at: response.created_at,
    });
  });
});
