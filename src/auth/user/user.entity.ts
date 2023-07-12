import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Mykhailo' })
  firstName: string;

  @ApiProperty({ example: 'Kloz' })
  lastName: string;

  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @ApiProperty({ example: 'SecretPasword12#' })
  password?: string;

  @ApiProperty({
    enum: Role,
    example: 'user',
  })
  role: Role;
}
