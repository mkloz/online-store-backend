import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { User } from '../user.entity';

export const ApiUserMeUpdate = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update information about current user. [open for: ME]',
    }),
    ApiResponseData(User),
  );
