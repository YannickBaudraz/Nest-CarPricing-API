import { PasswordHelper } from './password.helper';
import { InvalidCredentialsException } from '../auth/invalid-credentials.exception';
import * as bcrypt from 'bcrypt';
import { PrivateConstructorException } from '../exceptions/PrivateConstructorException';

jest.mock('bcrypt');
const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;

describe('PasswordHelper', () => {
  const password = 'password';
  const getHash = (password: string) => {
    const rounds = 10;
    return bcrypt.hashSync(password, rounds);
  };

  it('should not be instantiable', () => {
    expect(() => new PasswordHelper()).toThrow(
      new PrivateConstructorException('PasswordHelper'),
    );
  });

  it('should hash a password', async () => {
    const hash = await PasswordHelper.hash(password);
    expect(hash).not.toEqual(password);
  });

  it('should validate a password', async () => {
    bcryptMock.compare.mockResolvedValue(true as never);
    const hash = getHash(password);
    const promise = PasswordHelper.validate(password, hash);
    await expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    await expect(promise).resolves.not.toThrow(Error);
  });

  it('should throw an error when validating an invalid password', async () => {
    const hash = getHash(password);
    const promise = PasswordHelper.validate('invalid', hash);
    await expect(promise).rejects.toThrow(InvalidCredentialsException);
  });
});
