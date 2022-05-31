import { CreateUserUseCase } from '@application/modules/accounts/usecases/create-user/create-user-usecase';

interface ISutTypes {
  sut: CreateUserUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = new CreateUserUseCase();

  return {
    sut,
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
    const { sut } = makeSut();

    const user = {
      name: 'any_name',
      email: 'any_valid_email@mail.com',
      password: 'any_valid_password',
      confirmPassword: 'invalid_password',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should be able to create a new User', async () => {
    const { sut } = makeSut();

    const user = {
      name: 'any_name',
      email: 'any_valid_email@mail.com',
      password: 'any_valid_password',
      confirmPassword: 'any_valid_password',
    };

    const response = await sut.execute(user);

    expect(response).toHaveProperty('id');
  });
});
