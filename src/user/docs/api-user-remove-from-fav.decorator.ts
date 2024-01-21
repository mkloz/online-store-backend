import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { User } from '@user/user.entity';

export const ApiUserRemoveFav = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Remove article from users favorites. [open for: ME]',
    }),
    ApiResponseData(User),
  );
