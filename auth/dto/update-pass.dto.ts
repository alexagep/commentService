import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength, IsString } from 'class-validator';
import { UpdateDateColumn } from 'typeorm';

export class UpdatePassDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({ required: true })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({ required: true })
  rePassword: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
