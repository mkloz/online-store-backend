import { Provider } from '@prisma/client';
import * as dotenv from 'dotenv';
import { Done } from '@shared/dto';
import { UserService } from '@user/user.service';
import { ApiConfigService } from '@config/api-config.service';

dotenv.config();

export async function createAdmin(
  userService: UserService,
  acs: ApiConfigService,
): Promise<Done> {
  const admin = acs.getOnlineStore().admin;

  for (const key in Object.keys(admin)) {
    if (!key) throw new Error('Provide env variables!');
  }
  admin.password = await UserService.hashPassword(admin.password);
  await userService.createAdmin({ ...admin, provider: Provider.EMAIL });

  return new Done();
}
