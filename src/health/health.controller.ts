import { ApiConfigService } from '@config/api-config.service';
import { PrismaService } from '@db/prisma.service';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { Role } from '@prisma/client';
import { Roles } from '@shared/decorators';
import { RoleAuthGuard } from '@shared/guards';
import { GLOBAL_PREFIX, Prefix } from '@utils/prefix.enum';

@ApiBearerAuth()
@ApiTags('Healthcheck')
@Controller(Prefix.HEALTH)
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: PrismaHealthIndicator,
    private cs: ApiConfigService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get state of api. [open for: everyone]' })
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'backend',
          `${this.cs.getOnlineStore().backendUrl}/${GLOBAL_PREFIX}/${
            Prefix.HEALTH
          }/ok`,
        ),
      () => this.db.pingCheck('database', this.prisma),
    ]);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get state of frontend. [open for: everyone]' })
  @HealthCheck()
  @Roles(Role.ADMIN)
  @UseGuards(RoleAuthGuard)
  checkFrontend() {
    return this.health.check([
      () =>
        this.http.pingCheck('frontend', this.cs.getOnlineStore().frontendUrl),
    ]);
  }

  @Get('ok')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get callback from backend. [open for: everyone]' })
  ok() {
    return { ok: true };
  }
}
