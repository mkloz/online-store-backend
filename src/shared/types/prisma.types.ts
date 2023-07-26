import { Prisma } from '@prisma/client';

type LowercaseFirstLetter<T extends string> =
  T extends `${infer First}${infer Rest}` ? `${Lowercase<First>}${Rest}` : T;

export type PrismaClientModelKeys = LowercaseFirstLetter<Prisma.ModelName>;
