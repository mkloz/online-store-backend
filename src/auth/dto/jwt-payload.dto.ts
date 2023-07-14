import { IsEmail, IsEnum, IsInt, IsPositive } from 'class-validator';
import { IJwtPayload } from '../validators/jwt-payload.validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateJwtPayload {
  @IsInt()
  @IsPositive()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}

export class JwtPayload extends CreateJwtPayload implements IJwtPayload {
  @IsInt()
  @IsPositive()
  iat: number;

  @IsPositive()
  @IsInt()
  exp: number;
}
