import { ApiProperty } from '@nestjs/swagger';

export class Article {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'bike' })
  type: string;
  @ApiProperty({ example: 199 })
  price: number;
  @ApiProperty({ example: 'You must to buy it' })
  discription: string;
  @ApiProperty({ example: 'Cool Bike' })
  name: string;
  @ApiProperty({ example: 9 })
  count: number;
  @ApiProperty({ example: 'kids' })
  ageGroup: string;
  @ApiProperty({ example: 8924 })
  views: number;
  @ApiProperty({ example: 'unisex' })
  gender: string;
  @ApiProperty({ example: false })
  isPreviouslyUsed: boolean;
  @ApiProperty({ type: Date })
  createdAt: Date;
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
