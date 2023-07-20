import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GlobalResponseInterceptor } from './common/global-response.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/global-exception.filter';
import { createSwapiDocument } from './common/docs/create-swagger-doc';
import { ApiConfigService } from './config/api-config.service';
import { useContainer } from 'class-validator';

function getMorganCfg(): string {
  return ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms';
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const cs = app.get(ApiConfigService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app
    .use(morgan(getMorganCfg()))
    .setGlobalPrefix('api', { exclude: ['/'] })
    .useGlobalPipes(
      new ValidationPipe({ transform: true, validateCustomDecorators: true }),
    )
    .useGlobalInterceptors(new GlobalResponseInterceptor());

  const port = cs.getPort();

  if (cs.isDevelopment()) {
    SwaggerModule.setup('/api/docs', app, createSwapiDocument(app));
  } else {
    app.useGlobalFilters(new GlobalExceptionFilter(cs));
  }

  await app.listen(port, () => {
    Logger.log(`Server is running on ${port} port`);
  });
}

bootstrap();
