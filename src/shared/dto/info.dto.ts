import { ApiProperty } from '@nestjs/swagger';
import { GLOBAL_PREFIX, Prefix } from '@utils/prefix.enum';

export const GITHUB_REPO = 'https://github.com/mkloz/online-store';

export class Info {
  @ApiProperty({ example: true })
  hello: boolean;
  @ApiProperty({ example: GITHUB_REPO })
  source: string;
  @ApiProperty({ example: `/${GLOBAL_PREFIX}/docs` })
  docs: string;
  @ApiProperty({ example: `/${GLOBAL_PREFIX}/${Prefix.HEALTH}` })
  health: string;

  constructor(info: Info) {
    Object.assign(this, info);
  }
}
