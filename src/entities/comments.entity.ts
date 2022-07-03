import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Likes } from './likes.entity';
import { Posts } from './posts.entity';

@Entity('comments')
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  content: string;

  @Column({ default: 0 })
  @ApiProperty()
  likesCount: number;

  @Column({ nullable: false })
  @ApiProperty()
  senderId: number;

  @Column({ nullable: false })
  @ApiProperty()
  postId: number;

  @ManyToOne(() => Posts, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: Posts;

  @OneToMany(() => Likes, (like) => like.comment)
  likes: Likes[];

  @Column({ default: null })
  @CreateDateColumn()
  postedAt: Date;
}
