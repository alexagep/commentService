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
import { Posts } from './post.entity';
import { Likes } from './likes.entity';
import { Comments } from './comments.entity';

@Entity()
export class User {
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

  // @Column('text', { default: null, array: true })
  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Likes, (like) => like.user)
  likes: Likes[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  @Column({ default: null })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null })
  @UpdateDateColumn()
  updatedAt: Date;
}
