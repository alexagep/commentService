import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Likes } from './likes.entity';
import { Posts } from './posts.entity';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  @ApiProperty()
  content: string;

  @Column({ default: 0 })
  @ApiProperty()
  likesCount: number;

  @Column({ default: null })
  @ApiProperty()
  senderId: number;

  @Column({ nullable: false })
  @ApiProperty()
  postId: number;

  @ManyToOne(() => Posts, (post) => post.comments)
  @JoinColumn({ name: 'postId' })
  post: Posts;

  @OneToMany(() => Likes, (like) => like.comment)
  likes: Likes[];

  // @OneToMany(() => Comments, (comment) => comment.post)
  // comments: Comments[];

  @Column({ default: null })
  @CreateDateColumn()
  postedAt: Date;
}
