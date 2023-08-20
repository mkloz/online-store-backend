import * as request from 'supertest';
import { PrismaService } from '@db/prisma.service';
import { app } from './main.e2e-spec';

describe('AppController (e2e)', () => {
  let prisma: PrismaService;

  beforeAll(async () => {
    prisma = app.get(PrismaService);
  });
  beforeEach(async () => {
    await prisma.clear();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  afterAll(() => {
    app.close();
  });
});
