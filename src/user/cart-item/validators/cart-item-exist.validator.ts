import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@ValidatorConstraint({ name: 'CartItemExist', async: true })
@Injectable()
export class CartItemExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: unknown): Promise<boolean> {
    if (!id || typeof id !== 'number') {
      return false;
    }

    return !!(await this.prisma.cartItem.findUnique({ where: { id } }));
  }

  defaultMessage() {
    return `CartItem not exist`;
  }
}

export function CartItemExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CartItemExistConstraint,
    });
  };
}
