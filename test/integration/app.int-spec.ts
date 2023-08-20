import { PrismaService } from '@db/prisma.service';
import { AppController } from '@app/app.controller';
import { app } from './main.int-spec';
import { Info } from '@shared/dto';

describe('AppController (int)', () => {
  let prisma: PrismaService;
  let controller: AppController;

  beforeAll(async () => {
    prisma = app.get(PrismaService);
    controller = app.get(AppController);
  });

  beforeEach(async () => {
    await prisma.clear();
  });

  it('/ (GET)', () => {
    const res = controller.getInfo();

    expect(res).toBeInstanceOf(Info);
  });
});
