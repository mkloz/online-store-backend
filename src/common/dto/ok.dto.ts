import { ApiProperty } from '@nestjs/swagger';

export class Ok {
  @ApiProperty()
  ok: boolean;
}
