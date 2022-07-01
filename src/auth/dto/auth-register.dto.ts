import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Matches,
  MinLength,
  IsString,
  // IsNumber,
  //   IsOptional,
} from 'class-validator';
// import { Posts } from '../../entities/post.entity';

export class AuthRegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  email: string;

  //   @IsOptional()
  //   posts: Posts[];

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({ required: true })
  password: string;
}
