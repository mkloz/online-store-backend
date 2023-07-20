import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  connectIfDefined<T extends number>(field?: T) {
    return field
      ? {
          connect: { id: field },
        }
      : undefined;
  }
  connectArrayIfDefined(field: number[] | undefined) {
    return field && field.length
      ? {
          connect: field.map((id) => ({
            id,
          })),
        }
      : undefined;
  }
  updateIfDefined<T extends number>(field?: T) {
    if (typeof field === 'undefined') {
      return undefined;
    }
    return field !== null ? { update: { id: field } } : { delete: true };
  }
  setArrayIfDefined(field: number[] | undefined) {
    return field
      ? {
          set: field.map((id) => ({
            id,
          })),
        }
      : undefined;
  }
}
