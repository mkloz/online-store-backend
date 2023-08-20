import { HttpServer, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '@db/prisma.service';
import { GLOBAL_PREFIX, Prefix } from '@utils/prefix.enum';
import { UserService } from '@user/services/user.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { app } from './main.e2e-spec';

describe('AuthEmailController (e2e)', () => {
  let prisma: PrismaService;
  let server: HttpServer;

  beforeAll(async () => {
    prisma = app.get(PrismaService);
    server = app.getHttpServer();
  });

  beforeEach(async () => {
    await prisma.clear();
    await createAdmin(app.get(UserService), adminCredentials);
  });

  describe(`/${GLOBAL_PREFIX}/${Prefix.AUTH_EMAIL}/register (POST)`, () => {
    let route: request.Test;

    beforeAll(() => {
      route = request(server)
        .post(`/${GLOBAL_PREFIX}/${Prefix.AUTH_EMAIL}/register`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
    });

    it('Standart register', () => {
      return route
        .send({
          name: `DILspuwvs`,
          email: `r3evw32r@gmail.com`,
          password: `DIL4clsp2#f@b`,
        })
        .expect(HttpStatus.CREATED);
    });
    it('Invalid email', () => {
      return route
        .send({
          name: `DILs3ptwvs`,
          email: `g3ersd@g`,
          password: `DIL4clsp2#f@b`,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
    it('Invalid name', () => {
      return route
        .send({
          name: ``,
          email: `r3e2vw3r@gmail.com`,
          password: `DIL4clsp2#f@b`,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
    it('Invalid password', () => {
      return route
        .send({
          name: `DILs3ptwvs`,
          email: `r3ev23w3r@gmail.com`,
          password: `w3f23fssdf`,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe(`/${GLOBAL_PREFIX}/${Prefix.AUTH_EMAIL}/login (POST)`, () => {
    let route: request.Test;

    beforeAll(() => {
      route = request(server)
        .post(`/${GLOBAL_PREFIX}/${Prefix.AUTH_EMAIL}/login`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
    });

    it('Standart login', () => {
      return route
        .send({
          email: adminCredentials.email,
          password: adminCredentials.password,
        })
        .expect(HttpStatus.OK);
    });
    it('Invalid login', () => {
      return route
        .send({
          email: `invalid@gmail.com`,
          password: `DIL4clsp2#f@b`,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await prisma.clear();
  });
});
export const adminCredentials = {
  name: `MeAsAdmin`,
  email: `fake@gmail.com`,
  password: `grpmds#RFwe#23`,
};

export async function createAdmin(user: UserService, cred: CreateUserDto) {
  return await user.createAdmin(cred);
}
