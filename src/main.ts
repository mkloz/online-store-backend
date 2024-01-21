import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { ApiConfigService } from './config/api-config.service';
import { useContainer } from 'class-validator';
import { GLOBAL_PREFIX } from '@utils/prefix.enum';
import { join } from 'node:path';
import { Swagger } from '@utils/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const cs = app.get(ApiConfigService);
  const port = cs.getPort();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix(GLOBAL_PREFIX, { exclude: ['/'] });
  app.useStaticAssets(join(process.cwd(), 'assets'), { prefix: '/api/assets' });

  if (cs.isDevelopment()) {
    Swagger.setup(app);
  }

  await app.listen(port, () => {
    Logger.log(`Server is running on ${port} port`, 'App');
  });
}

bootstrap();
