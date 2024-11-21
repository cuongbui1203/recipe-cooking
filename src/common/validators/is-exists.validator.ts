import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ name: 'IsExistsConstraint', async: true })
@Injectable()
export class IsExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { tableName, column }: IsExistsInterface = args.constraints[0];

    const dataExist = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder()
      .withDeleted()
      .where({ [column]: value })
      .getExists();

    if (dataExist) {
      return true;
    }

    throw new UnprocessableEntityException(`${args.property} not found`);
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    // return custom field message
    const field: string = validationArguments.property;
    return `${field} is already exist`;
  }
}

export type IsExistsInterface = {
  tableName: string;
  column: string;
};

// decorator function
export function IsExists(
  options: IsExistsInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsExistsConstraint,
    });
  };
}
