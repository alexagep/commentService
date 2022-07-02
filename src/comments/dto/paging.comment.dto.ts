import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PagingDto {
  @IsNumber()
  @ApiProperty()
  pageIndex: number;

  @IsNumber()
  @ApiProperty()
  pageSize: number;

  @IsNumber()
  @ApiProperty()
  limit: number;
}
