import { IsEmail, IsEnum, IsInt, IsPositive } from 'class-validator';
import { IJwtPayload } from '../validators/jwt-payload.validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload implements IJwtPayload {
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
