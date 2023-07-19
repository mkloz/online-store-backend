import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';
import { AuthEmailModule } from './auth-email/auth-email.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { ApiConfigModule } from 'src/config/api-config.module';
import { RoleAuthGuard } from './guards/role-auth.guard';
import { MeAuthGuard } from './guards/me-auth.guard';

@Module({
  imports: [
    ApiConfigModule,
    UserModule,
    DbModule,
    AuthEmailModule,
    AuthGoogleModule,
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RoleAuthGuard, MeAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
