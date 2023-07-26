import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { User } from '../user.entity';

export const ApiUserMeDelete = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete current user from db. [open for: ME]' }),
    ApiResponseData(User),
  );
