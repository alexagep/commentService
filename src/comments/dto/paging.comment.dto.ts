import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PagingDto {
  @IsString()
  @ApiProperty()
  pageIndex: number;

  @IsNumber()
  @ApiProperty()
  pageSize: number;

  @IsNumber()
  @ApiProperty()
  limit: number;
}
