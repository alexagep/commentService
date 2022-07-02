import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
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

  @Column()
  @ApiProperty()
  senderId: number;

  @Column()
  @ApiProperty()
  commentId: number;

  @ManyToOne(() => Comments, (comment) => comment.likes)
  @JoinColumn({ name: 'commentId' })
  comment: Comments;
}
