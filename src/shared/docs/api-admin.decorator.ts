import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const ApiAdmin = () => applyDecorators(ApiTags('Admin'));
