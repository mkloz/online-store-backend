import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { IConfig } from 'src/common/configs/config.interface';
import { SocialInterface } from '../interfaces/social.interface';

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;
  constructor(private configService: ConfigService<IConfig>) {
    const config = this.configService.get('auth', { infer: true }).google;
    this.google = new OAuth2Client(config.clientId, config.clientSecret);
  }
  static wrongTokenException = new UnprocessableEntityException('Wrong token');

  async getProfileByToken(
    loginDto: AuthGoogleLoginDto,
  ): Promise<SocialInterface> {
    const ticket = await this.google.verifyIdToken({
      idToken: loginDto.idToken,
      audience: [
        this.configService.get('auth', { infer: true }).google.clientId,
      ],
    });

    const data = ticket.getPayload();

    if (!data) {
      throw AuthGoogleService.wrongTokenException;
    }

    return {
      id: data.sub,
      email: data.email,
      firstName: data.given_name,
      lastName: data.family_name,
    };
  }
}
