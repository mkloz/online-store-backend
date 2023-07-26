import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from '@db/db.module';
import { AuthEmailModule } from './auth-email/auth-email.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { ApiConfigModule } from '@config/api-config.module';
import { RoleAuthGuard, MeAuthGuard, AuthGuard } from '@shared/guards';

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
