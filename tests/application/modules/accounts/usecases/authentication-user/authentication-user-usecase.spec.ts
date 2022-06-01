import { AuthenticationUserUseCase } from '@application/modules/accounts/usecases/authentication-user/authentication-user-usecase';

describe('Authentication User UseCase', () => {
  it('should be able to authenticate a User', async () => {
    const credentials = {
      email: 'any_valid_email@mail.com',
      password: '1234',
    };

    const sut = new AuthenticationUserUseCase();

    const response = await sut.execute(credentials);

    expect(response).toHaveProperty('token');
  });
});
