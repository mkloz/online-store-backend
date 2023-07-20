import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSaleDto } from './create-sale.dto';

export class UpdateSaleDto extends OmitType(PartialType(CreateSaleDto), [
  'article',
]) {}
