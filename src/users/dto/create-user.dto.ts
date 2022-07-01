// import { ApiProperty } from '@nestjs/swagger';
// import {
//   IsNotEmpty,
//   Matches,
//   MinLength,
//   IsString,
//   // IsNumber,
//   // IsOptional,
// } from 'class-validator';
// // import { UserRoles } from '../../model/userRoles';
// // import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
// // import { Posts } from '../../entities/post.entity';

// export class CreateUserDto {
//   // id: number;
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty({ required: true })
//   name: string;

//   // @IsNotEmpty()
//   // @IsNumber()
//   // @ApiProperty({ required: true })
//   // age: number;

//   // @IsNotEmpty()
//   // @IsString()
//   // @ApiProperty({ required: true })
//   // mobile: string;

//   // @IsNotEmpty()
//   // @IsString()
//   // @ApiProperty()
//   // role: UserRoles;

//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty({ required: true })
//   email: string;

//   // @IsOptional()
//   // posts: Posts[];

//   @IsNotEmpty()
//   @IsString()
//   @MinLength(6)
//   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
//   @ApiProperty({ required: true })
//   password: string;

//   // @CreateDateColumn()
//   // createdAt: Date;

//   // @UpdateDateColumn()
//   // updatedAt: Date;
// }
