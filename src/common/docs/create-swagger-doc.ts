import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IDDto } from '../dto/id.dto';
import { Paginated } from '../pagination/paginated.dto';

export function createSwapiDocument(app: NestExpressApplication) {
  const cfg = new DocumentBuilder()
    .setTitle('Online Store API')
    .setDescription('API for online store')
    .setVersion('1.0')
    .build();

  return SwaggerModule.createDocument(app, cfg, {
    extraModels: [Paginated, IDDto],
  });
}
