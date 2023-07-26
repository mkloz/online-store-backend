import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@db/prisma.service';

@ValidatorConstraint({ name: 'ReviewExist', async: true })
@Injectable()
export class ReviewExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: unknown): Promise<boolean> {
    if (!id || typeof id !== 'number') {
      return false;
    }

    return !!(await this.prisma.review.findUnique({ where: { id } }));
  }

  defaultMessage() {
    return `Review not exist`;
  }
}

export function ReviewExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ReviewExistConstraint,
    });
  };
}
