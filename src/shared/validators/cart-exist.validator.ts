import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@db/prisma.service';

@ValidatorConstraint({ name: 'CartNotEmpty', async: true })
@Injectable()
export class CartNotEmptyConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: unknown): Promise<boolean> {
    if (!id || typeof id !== 'number') {
      return false;
    }

    return !!(
      await this.prisma.cart.findUnique({
        where: { id },
        include: { cartItems: true },
      })
    )?.cartItems.length;
  }

  defaultMessage() {
    return `Cart does not exist or empty`;
  }
}

export function CartNotEmpty(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CartNotEmptyConstraint,
    });
  };
}
