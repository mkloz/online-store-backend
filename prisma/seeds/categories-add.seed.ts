import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Done } from '@shared/dto';
export enum Category {
  BICYCLE = 'bicycle',
  GYROBOARD = 'gyroboard',
  SKATEBOARD = 'skateboard',
  SCOOTER = 'scooter',
  MONOWHEEL = 'monowheel',
  ACCESSORY = 'accessory',
}
const categoriesNames = [
  'bicycle',
  'gyroboard',
  'skateboard',
  'scooter',
  'monowheel',
  'accessory',
] as const;

export type ICategory = (typeof categoriesNames)[number];

export async function createCategories(prisma: PrismaClient): Promise<Done> {
  const logger = new Logger('CategorySeed');
  await Promise.all(
    categoriesNames.map(async (name) => {
      await prisma.category.upsert({
        where: { name },
        update: { name },
        create: { name },
      });
      logger.log('Category created: ' + name);
    }),
  );
  return new Done();
}
