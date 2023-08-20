import { PrismaService } from '@db/prisma.service';
import { GLOBAL_PREFIX, Prefix } from '@utils/prefix.enum';
import { UserService } from '@user/services/user.service';
import { AuthEmailController } from '@auth/auth-email/auth-email.controller';
import { User } from '@user/user.entity';
import { TokensDto } from '@auth/dto/tokens.dto';
import { adminCredentials, createAdmin } from 'test/e2e/auth-email.e2e-spec';
import { app } from './main.int-spec';

describe('AuthEmailController (int)', () => {
  let prisma: PrismaService;
  let controller: AuthEmailController;

  beforeAll(async () => {
    prisma = app.get(PrismaService);
    controller = app.get(AuthEmailController);
  });

  beforeEach(async () => {
    await prisma.clear();
    await createAdmin(app.get(UserService), adminCredentials);
  });

  describe(`/${GLOBAL_PREFIX}/${Prefix.AUTH_EMAIL}/register (POST)`, () => {
    it('Standart register', async () => {
      const res = await controller.register({
        name: `DILspuwvs`,
        email: `r3evw32r@gmail.com`,
        password: `DIL4clsp2#f@b`,
      });
      expect(res).toBeInstanceOf(User);
    });
  });

  describe(`/${GLOBAL_PREFIX}/${Prefix.AUTH_EMAIL}/login (POST)`, () => {
    it('Standart login', async () => {
      const res = await controller.login({
        email: adminCredentials.email,
        password: adminCredentials.password,
      });
      expect(res).toBeInstanceOf(TokensDto);
    });
    it.failing('Invalid login', async () => {
      const res = await controller.login({
        email: `invalid@gmail.com`,
        password: `DIL4clsp2#f@b`,
      });
      expect(res).toBeInstanceOf(TokensDto);
    });
  });

  afterAll(async () => {
    await prisma.clear();
  });
});
