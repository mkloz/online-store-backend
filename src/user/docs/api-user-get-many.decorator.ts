import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@shared/docs';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';
import { User } from '@user/user.entity';

export const ApiUserGetMany = () =>
  applyDecorators(
    ApiPaginatedResponse(User),
    ApiBearerAuth(),
    ApiAdmin(),
    ApiOperation({
      summary: 'Get paginated list of user from db. [open for ADMIN]',
    }),
  );
