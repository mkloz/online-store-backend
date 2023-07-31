import { ApiProperty } from '@nestjs/swagger';
import { IDone } from '@shared/types';

export class Done implements IDone {
  @ApiProperty()
  done: boolean;

  constructor(value = true) {
    this.done = value;
  }
}
