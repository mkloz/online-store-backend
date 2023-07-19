import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { SocialInterface } from '../interfaces/social.interface';
import { ApiConfigService } from 'src/config/api-config.service';

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;
  constructor(private readonly cs: ApiConfigService) {
    const config = this.cs.getAuth().google;
    this.google = new OAuth2Client(config.clientId, config.clientSecret);
  }
  static wrongTokenException = new UnprocessableEntityException('Wrong token');

  async getProfileByToken(
    loginDto: AuthGoogleLoginDto,
  ): Promise<SocialInterface> {
    const ticket = await this.google.verifyIdToken({
      idToken: loginDto.idToken,
      audience: [this.cs.getAuth().google.clientId],
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
