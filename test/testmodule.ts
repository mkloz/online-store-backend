import { AppModule } from '@app/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GLOBAL_PREFIX } from '@utils/prefix.enum';
import { useContainer } from 'class-validator';

export class TestModule {
  static async createTestModule(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleFixture.createNestApplication();

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.setGlobalPrefix(GLOBAL_PREFIX, { exclude: ['/'] });
    await app.init();

    return app;
  }
}
