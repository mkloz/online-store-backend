import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerCreator } from './utils/create-swagger-doc';
import { ApiConfigService } from './config/api-config.service';
import { useContainer } from 'class-validator';
import { GLOBAL_PREFIX } from '@utils/prefix.enum';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const cs = app.get(ApiConfigService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix(GLOBAL_PREFIX, { exclude: ['/'] });

  const port = cs.getPort();

  if (cs.isDevelopment()) {
    SwaggerModule.setup(
      `/${GLOBAL_PREFIX}/docs`,
      app,
      SwaggerCreator.createDocument(app),
    );
  }

  await app.listen(port, () => {
    Logger.log(`Server is running on ${port} port`, 'App');
  });
}

bootstrap();
