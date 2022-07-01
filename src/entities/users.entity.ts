import { ApiProperty } from '@nestjs/swagger';
// import { UserRoles } from '../model/userRoles';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Posts } from './posts.entity';
// import { Likes } from './likes.entity';
import { Comments } from './comments.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  @ApiProperty()
  name: string;

  @Column({ unique: true, default: null })
  @ApiProperty()
  email: string;

  @Column({ default: null })
  @ApiProperty()
  password: string;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  // @OneToMany(() => Likes, (like) => like.user)
  // likes: Likes[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  @Column({ default: null })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null })
  @UpdateDateColumn()
  updatedAt: Date;
}
