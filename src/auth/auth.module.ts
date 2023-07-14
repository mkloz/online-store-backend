import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    UserModule,
    DbModule,
    EmailModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
