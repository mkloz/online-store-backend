import { Module, forwardRef } from '@nestjs/common';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleController } from './auth-google.controller';
import { AuthModule } from '@auth/auth.module';
import { ApiConfigModule } from '@config/api-config.module';

@Module({
  imports: [ApiConfigModule, forwardRef(() => AuthModule)],
  providers: [AuthGoogleService],
  exports: [AuthGoogleService],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
