import { CreateUserUseCase } from '@application/modules/accounts/usecases/create-user/create-user-usecase';

describe('Create User UseCase', () => {
  it('should be able to create a new User', async () => {
    const sut = new CreateUserUseCase();

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
