import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { IDDto } from '@shared/dto/id.dto';

export const ApiRemoveFile = () =>
  applyDecorators(
    ApiResponseData(IDDto),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete uploaded file. [open for: ADMIN]' }),
  );
