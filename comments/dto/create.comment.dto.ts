import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class CreateCommentDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;

  @ApiProperty()
  userId?: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  postId: number;

  @CreateDateColumn()
  postedAt: Date;
}
