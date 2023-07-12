import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { IDDto } from 'src/common/dto/id.dto';

export const ApiRemoveFile = () =>
  applyDecorators(
    ApiResponseData(IDDto),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete uploaded file. [open for: ADMIN]' }),
  );
