import { BcryptProvider } from '@infra/container/providers/EncryptProvider/implementations/bcrypt-provider';

jest.mock('bcrypt');
const bcrypt = require('bcrypt');

const hashSalt = 12;

bcrypt.compare.mockReturnValue(true);

interface ISutTypes {
  sut: BcryptProvider;
}

const makeSut = (): ISutTypes => {
  const sut = new BcryptProvider();

  return {
    sut,
  };
};

describe('Bcrypt Provider', () => {
  it('should be able to compare Password encrypted', async () => {
    const { sut } = makeSut();

    const passwordHash = await bcrypt.hash('valid_password', hashSalt);

    const response = await sut.compare('valid_password', passwordHash);

    expect(response).toBe(true);
  });
});
