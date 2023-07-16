import { IsEmail, IsInt, IsPositive } from 'class-validator';

export class EmailCreateVerificationTokenPayload {
  @IsInt()
  id: number;
  @IsEmail()
  email: string;
}

export class EmailVerificationTokenPayload extends EmailCreateVerificationTokenPayload {
  @IsInt()
  @IsPositive()
  iat: number;

  @IsPositive()
  @IsInt()
  exp: number;
}
