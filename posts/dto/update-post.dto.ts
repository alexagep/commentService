import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class UpdatePostDto {

  @IsString()
  @ApiProperty()
  content: string;

  @CreateDateColumn()
  postedAt: Date;
}
