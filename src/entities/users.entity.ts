import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../model/userRoles';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: null })
  @ApiProperty()
  name: string;

  @Column({ unique: true, default: null })
  @ApiProperty()
  mobile: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.user })
  @ApiProperty()
  role: UserRoles;

  @Column({ unique: true, default: null })
  @ApiProperty()
  email: string;

  @Column({ default: null })
  @ApiProperty()
  password: string;

  @Column({ default: null })
  @ApiProperty()
  age: number;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @Column({ default: null })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null })
  @UpdateDateColumn()
  updatedAt: Date;
}
