interface IEncryptProvider {
  compare(password: string, password_hash: string): Promise<boolean>;
}

export { IEncryptProvider };
