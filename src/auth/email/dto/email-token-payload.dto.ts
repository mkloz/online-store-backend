import { IsEmail, IsInt, IsPositive } from 'class-validator';

export class EmailCreateTokenPayload {
  @IsEmail()
  email: string;
}

export class EmailTokenPayload extends EmailCreateTokenPayload {
  @IsInt()
  @IsPositive()
  iat: number;

  @IsPositive()
  @IsInt()
  exp: number;
}
