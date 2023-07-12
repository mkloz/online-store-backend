import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { User } from '../user.entity';

export const ApiUserByIdUpdate = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update information about user by id. [open for: ADMIN]',
    }),
    ApiResponseData(User),
  );
