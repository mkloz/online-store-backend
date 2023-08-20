import { INestApplication } from '@nestjs/common';
import { TestModule } from 'test/testmodule';

export let app: INestApplication;

beforeAll(async () => {
  app = await TestModule.createTestModule();
});

afterAll(async () => {
  app.close();
});

it('Start test (int)', () => {
  true;
});
