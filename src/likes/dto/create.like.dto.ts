import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
// import { CreateDateColumn } from 'typeorm';

export class CreateLikeDto {
  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  like: boolean;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  dislike: boolean;

  @IsNotEmpty()
  @ApiProperty()
  commentId: number;
}
