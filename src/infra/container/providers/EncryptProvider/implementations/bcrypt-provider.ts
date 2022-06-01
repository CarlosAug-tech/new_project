import { compare } from 'bcrypt';
import { IEncryptProvider } from '../contracts/encrypt-provider';

class BcryptProvider implements IEncryptProvider {
  async compare(password: string, password_hash: string): Promise<boolean> {
    const isMatch = await compare(password, password_hash);

    return isMatch;
  }
}

export { BcryptProvider };
