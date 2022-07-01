import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { CreateDateColumn } from 'typeorm';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  postId: number;
}
