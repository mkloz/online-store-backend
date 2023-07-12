import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Review } from 'src/review/entities/review.entity';

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Mykhailo' })
  firstName: string;

  @ApiProperty({ example: 'Kloz' })
  lastName: string;

  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @ApiPropertyOptional({ example: 'SecretPasword12#' })
  password?: string;

  @ApiProperty({
    enum: Role,
    example: 'user',
  })
  role: Role;

  @ApiProperty({ type: Review })
  reviews?: Review[];
}
