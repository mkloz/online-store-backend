import { PrismaClient } from '@prisma/client';
import { Ok } from 'src/common/dto/ok.dto';

export async function createCategories(prisma: PrismaClient): Promise<Ok> {
  const categoriesNames = ['bicycle', 'bike', 'scateboard', 'scooter'];

  await Promise.all(
    categoriesNames.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: { name },
        create: { name },
      }),
    ),
  );
  return { ok: true };
}
