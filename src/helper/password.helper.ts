import * as Bcrypt from 'bcrypt';
import { InvalidCredentialsException } from '../auth/invalid-credentials.exception';
import { PrivateConstructorException } from '../exceptions/PrivateConstructorException';

export class PasswordHelper {
  constructor() {
    throw new PrivateConstructorException(this.constructor.name);
  }

  static hash(password: string): Promise<string> {
    const rounds = 10;
    return Bcrypt.hash(password, rounds);
  }

  static async validate(password: string, hash: string) {
    const isValid = await PasswordHelper.isValid(password, hash);
    if (!isValid) throw new InvalidCredentialsException();
  }

  private static async isValid(password: string, hash: string) {
    return await Bcrypt.compare(password, hash);
  }
}
