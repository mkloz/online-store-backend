import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@ValidatorConstraint({ name: 'UserExist', async: true })
@Injectable()
export class UserExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: unknown): Promise<boolean> {
    if (!id || typeof id !== 'number') {
      return false;
    }

    return !!(await this.prisma.user.findUnique({ where: { id } }));
  }

  defaultMessage() {
    return `User not exist`;
  }
}

export function UserExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistConstraint,
    });
  };
}
