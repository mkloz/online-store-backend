import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';
import { IDDto } from '@shared/dto/id.dto';

export const ApiRemoveFile = () =>
  applyDecorators(
    ApiResponseData(IDDto),
    ApiBearerAuth(),
    ApiAdmin(),
    ApiOperation({ summary: 'Delete uploaded file. [open for: ADMIN]' }),
  );
