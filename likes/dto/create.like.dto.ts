import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class CreateLikeDto {

  @IsBoolean()
  @ApiProperty()
  like: boolean;

  @IsBoolean()
  @ApiProperty()
  dislike: boolean;

  @IsNotEmpty()
  @ApiProperty()
  commentId: number;

  userId?: number;

  @CreateDateColumn()
  postedAt: Date;
}
