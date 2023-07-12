import { Module } from '@nestjs/common';
import { UserModule } from 'src/auth/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    UserModule,
    DbModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
