import { Provider } from '@prisma/client';
import * as dotenv from 'dotenv';
import { Done } from '@shared/dto';
import { UserService } from '@user/services/user.service';
import { ApiConfigService } from '@config/api-config.service';
import { Logger } from '@nestjs/common';

dotenv.config();

export async function createAdmin(
  userService: UserService,
  acs: ApiConfigService,
): Promise<Done> {
  const admin = acs.getOnlineStore().admin;

  await userService.createAdmin({
    name: admin.name,
    password: admin.password,
    email: admin.email,
    provider: Provider.EMAIL,
  });

  new Logger('AdminSeed').log('Admin created: ' + admin.email);

  return new Done();
}
