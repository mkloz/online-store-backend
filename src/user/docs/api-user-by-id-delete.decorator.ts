import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { User } from '../user.entity';

export const ApiUserByIdDelete = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete user from db by id. [open for: ADMIN]' }),
    ApiResponseData(User),
  );
