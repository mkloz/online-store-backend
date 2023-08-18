import { Controller, Get } from '@nestjs/common';
import { GLOBAL_PREFIX, Prefix } from './utils';
import {
  ApiExtraModels,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';

class Info {
  @ApiProperty()
  hello: boolean;
  @ApiProperty()
  source: string;
  @ApiProperty()
  docs: string;
  @ApiProperty()
  health: string;

  constructor(info: Info) {
    Object.assign(this, info);
  }
}

@ApiTags('Root')
@ApiExtraModels(Info)
@Controller(Prefix.ROOT)
export class AppController {
  static GITHUB_REPO = 'https://github.com/mkloz/online-store';

  @Get()
  @ApiResponseData(Info)
  @ApiOperation({ summary: 'Hello from server. [open for everyone]' })
  getInfo() {
    return new Info({
      hello: true,
      source: AppController.GITHUB_REPO,
      docs: `${GLOBAL_PREFIX}/docs`,
      health: `${GLOBAL_PREFIX}/${Prefix.HEALTH}`,
    });
  }
}
