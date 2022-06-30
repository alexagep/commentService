import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Likes } from './likes.entity';
import { Posts } from './post.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  @ApiProperty()
  content: string;

  // @Column({ default: null })
  // @ApiProperty()
  // userId: number;

  // @Column({ default: null })
  // @ApiProperty()
  // postId: number;

  @Column({ default: null })
  @ApiProperty()
  likesCount: number;

  @Column({ default: null })
  @ApiProperty()
  dislikesCount: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Posts, (post) => post.comments)
  post: Posts;

  @OneToMany(() => Likes, (like) => like.comment)
  likes: Likes[];

  @Column({ default: null })
  @CreateDateColumn()
  postedAt: Date;
}
