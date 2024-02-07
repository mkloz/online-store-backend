import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiEmailConfirm = () =>
  applyDecorators(
    ApiResponse({ status: HttpStatus.PERMANENT_REDIRECT }),
    ApiOperation({
      summary:
        'Confirm email token and set status of user email as vefificated',
    }),
  );
