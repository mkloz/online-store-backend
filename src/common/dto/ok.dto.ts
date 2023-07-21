import { ApiProperty } from '@nestjs/swagger';

export class Ok {
  @ApiProperty()
  ok: boolean;

  constructor(value = true) {
    this.ok = value;
  }
}
