import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { Users } from './users.entity';
import { Comments } from './comments.entity';

@Entity('likes')
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  @ApiProperty()
  hasLiked: boolean;

  @Column({ default: false })
  @ApiProperty()
  hasDisliked: boolean;

  @Column({ nullable: false })
  @ApiProperty()
  senderId: number;

  @Column({ nullable: false })
  @ApiProperty()
  commentId: number;

  @ManyToOne(() => Comments, (comment) => comment.likes)
  @JoinColumn({ name: 'commentId' })
  comment: Comments;

  // @ManyToOne(() => Users, (user) => user.posts)
  // @JoinColumn({ referencedColumnName: 'id' })
  // user: Users;

  // @OneToMany(() => Comments, (comment) => comment.post)
  // comments: Comments[];
}
