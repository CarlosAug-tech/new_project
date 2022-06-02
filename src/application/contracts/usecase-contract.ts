import { AppError } from '@infra/shared/errors/app-error';

abstract class UseCase<TRequest extends {}, TResponse extends {}> {
  abstract perform(data?: TRequest): Promise<TResponse>;

  async execute(data?: TRequest): Promise<TResponse> {
    if (data) {
      if (data instanceof Object) {
        const fields = Object.keys(data);
        this.validate(fields, data);
      }

      return await this.perform(data);
    }

    return this.perform();
  }

  private validate(fields: string[], data: any): void {
    for (const field of fields) {
      if (!data[field]) {
        throw new AppError(`This ${field} field is required!`);
      }
    }
  }
}

export { UseCase };
