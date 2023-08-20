import { Controller, Get } from '@nestjs/common';
import { GLOBAL_PREFIX, Prefix } from './utils';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { GITHUB_REPO, Info } from '@shared/dto';
import { ApiApp } from '@shared/docs/api-app.decorator';
@ApiApp()
@Controller(Prefix.ROOT)
export class AppController {
  @Get()
  @ApiResponseData(Info)
  @ApiOperation({ summary: 'Hello from server. [open for everyone]' })
  getInfo() {
    return new Info({
      hello: true,
      source: GITHUB_REPO,
      docs: `/${GLOBAL_PREFIX}/docs`,
      health: `/${GLOBAL_PREFIX}/${Prefix.HEALTH}`,
    });
  }
}
