import { AuthenticationUserUseCase } from '@application/modules/accounts/usecases/authentication-user/authentication-user-usecase';

interface ISutTypes {
  sut: AuthenticationUserUseCase;
}

const makeSut = (): ISutTypes => {
  const sut = new AuthenticationUserUseCase();

  return {
    sut,
  };
};

describe('Authentication User UseCase', () => {
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
