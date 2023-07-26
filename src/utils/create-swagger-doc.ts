import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IDDto } from '@shared/dto/id.dto';
import { Paginated } from '@shared/pagination';

export function createSwapiDocument(app: NestExpressApplication) {
  const cfg = new DocumentBuilder()
    .setTitle('Online Store API')
    .setDescription('API for online store')
    .setVersion('1.0')
    .setLicense('LICENSE', 'https://github.com/Kloz-Mykhail/online-store')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  return SwaggerModule.createDocument(app, cfg, {
    extraModels: [Paginated, IDDto],
  });
}
