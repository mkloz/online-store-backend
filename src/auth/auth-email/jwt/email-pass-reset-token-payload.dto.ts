import { IsEmail, IsInt, IsPositive } from 'class-validator';

export class EmailCreatePassResetTokenPayload {
  @IsInt()
  id: number;
  @IsEmail()
  email: string;
}

export class EmailPassResetTokenPayload extends EmailCreatePassResetTokenPayload {
  @IsInt()
  @IsPositive()
  iat: number;

  @IsPositive()
  @IsInt()
  exp: number;
}
