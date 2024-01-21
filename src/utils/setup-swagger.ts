import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IDDto, Paginated } from '@shared/dto';
import { GLOBAL_PREFIX } from './prefix.enum';
import { NestExpressApplication } from '@nestjs/platform-express';

export class Swagger {
  public static createDocument(app: NestExpressApplication) {
    const cfg = Swagger.getConfig().build();

    return SwaggerModule.createDocument(app, cfg, {
      extraModels: [Paginated, IDDto],
    });
  }

  private static getConfig(): DocumentBuilder {
    return new DocumentBuilder()
      .setTitle('Online Store API')
      .setDescription('API for online store')
      .setVersion('1.0')
      .setLicense('LICENSE', 'https://github.com/mkloz/online-store')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      });
  }

  public static setup(app: NestExpressApplication) {
    SwaggerModule.setup(
      `/${GLOBAL_PREFIX}/docs`,
      app,
      Swagger.createDocument(app),
      {
        customSiteTitle: 'Citywheels api doc',
        customfavIcon: '/api/assets/logo.svg',
      },
    );
  }
}
