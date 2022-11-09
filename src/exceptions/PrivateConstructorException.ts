export class PrivateConstructorException extends Error {
  constructor(className: string) {
    super(`${className} is not instantiable`);
  }
}
