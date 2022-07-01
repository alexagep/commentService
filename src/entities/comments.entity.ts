import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  // OneToMany,
} from 'typeorm';
import { Users } from './users.entity';
// import { Likes } from './likes.entity';
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

  @ManyToOne(() => Users, (user) => user.comments)
  @JoinColumn({ referencedColumnName: 'id' })
  user: Users;

  @ManyToOne(() => Posts, (post) => post.comments)
  @JoinColumn({ referencedColumnName: 'id' })
  post: Posts;

  // @OneToMany(() => Likes, (like) => like.comment)
  // likes: Likes[];

  @Column({ default: null })
  @CreateDateColumn()
  postedAt: Date;
}
