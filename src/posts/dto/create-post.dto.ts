import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { CreateDateColumn } from 'typeorm';

export class CreatePostDto {
  @IsString()
  @ApiProperty()
  content: string;

  // senderId?: number;
}
