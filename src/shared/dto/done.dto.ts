import { ApiProperty } from '@nestjs/swagger';
import { IDone } from '@shared/types';

export class Done implements IDone {
  static instance: Done;
  @ApiProperty()
  done: boolean;

  constructor(value = true) {
    if (Done.instance) return Done.instance;
    this.done = value;

    Done.instance = this;
  }
}
