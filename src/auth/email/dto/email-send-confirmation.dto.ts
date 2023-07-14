import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailSendConfirmation {
  @IsEmail()
  @ApiProperty({ example: 'email@gmail.com' })
  email: string;
}
