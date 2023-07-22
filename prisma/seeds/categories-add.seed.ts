import { PrismaClient } from '@prisma/client';
import { Done } from 'src/common/dto/done.dto';

export async function createCategories(prisma: PrismaClient): Promise<Done> {
  const categoriesNames = [
    'bicycle',
    'gyroboard',
    'skateboard',
    'scooter',
    'monowheel',
    'accessory',
  ];

  await Promise.all(
    categoriesNames.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: { name },
        create: { name },
      }),
    ),
  );
  return new Done();
}
