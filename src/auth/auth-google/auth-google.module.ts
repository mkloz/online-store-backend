import { Module, forwardRef } from '@nestjs/common';
import { AuthGoogleService } from './auth-google.service';
import { ConfigModule } from '@nestjs/config';
import { AuthGoogleController } from './auth-google.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, forwardRef(() => AuthModule)],
  providers: [AuthGoogleService],
  exports: [AuthGoogleService],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
