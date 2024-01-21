import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { User } from '@user/user.entity';

export const ApiUserAddFav = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Add article to users favorites. [open for: ME]',
    }),
    ApiResponseData(User),
  );
