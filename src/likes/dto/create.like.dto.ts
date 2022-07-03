import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

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
