// import { ApiProperty } from '@nestjs/swagger';
// import { IsString, IsNumber, IsOptional } from 'class-validator';
// // import { UserRoles } from '../../model/userRoles';
// // import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
// import { Posts } from '../../entities/posts.entity';

// export class UpdateUserDto {
//   // id?: number;

//   password?: string;

//   @IsOptional()
//   @IsString()
//   @ApiProperty({ required: false })
//   name?: string;

//   // @IsOptional()
//   // @IsNumber()
//   // @ApiProperty({ required: false })
//   // age?: number;

//   @IsOptional()
//   posts: Posts[];

//   // @IsOptional()
//   // @ApiProperty()
//   // role: UserRoles;

//   // @IsOptional()
//   // @IsString()
//   // @ApiProperty({ required: false })
//   // mobile?: string;

//   @IsOptional()
//   @IsString()
//   @ApiProperty({ required: false })
//   email?: string;

//   // @CreateDateColumn()
//   // createdAt?: Date;

//   // @UpdateDateColumn()
//   // updatedAt?: Date;
// }
