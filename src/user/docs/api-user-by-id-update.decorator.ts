import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { User } from '../user.entity';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';

export const ApiUserByIdUpdate = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update information about user by id. [open for: ADMIN]',
    }),
    ApiAdmin(),
    ApiResponseData(User),
  );
