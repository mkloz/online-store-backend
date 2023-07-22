import { ApiProperty } from '@nestjs/swagger';

export class Done {
  @ApiProperty()
  done: boolean;

  constructor(value = true) {
    this.done = value;
  }
}
