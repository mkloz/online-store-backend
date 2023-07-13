import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GlobalResponseInterceptor } from './common/global-response.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/global-exception.filter';
import { ConfigService } from '@nestjs/config';
import { createSwapiDocument } from './common/docs/create-swagger-doc';
import { Env } from './common/dto/dotenv.dto';
import { EnvVar } from './common/config/config';

function isDevelopment(env: string): boolean {
  return env === Env.Development;
}
function getMorganCfg(): string {
  return ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms';
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const cs = app.get(ConfigService);
  app
    .use(morgan(getMorganCfg()))
    .setGlobalPrefix('api', { exclude: ['/'] })
    .useGlobalPipes(
      new ValidationPipe({ transform: true, validateCustomDecorators: true }),
    )
    .useGlobalInterceptors(new GlobalResponseInterceptor());

  const port = cs.get<number>(EnvVar.PORT);

  if (isDevelopment(cs.get<string>(EnvVar.ENV))) {
    SwaggerModule.setup('/api/docs', app, createSwapiDocument(app));
  } else {
    app.useGlobalFilters(new GlobalExceptionFilter(cs));
  }

  await app.listen(port, () => {
    Logger.log(`Server is running on ${port} port`);
  });
}

bootstrap();
