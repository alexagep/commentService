import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Comments } from './comments.entity';

@Entity('likes')
export class Likes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  @ApiProperty()
  hasLiked: boolean;

  @Column({ default: false })
  @ApiProperty()
  hasDisliked: boolean;

  @Column({ nullable: true })
  @ApiProperty()
  senderId: number;

  @Column({ nullable: true })
  @ApiProperty()
  commentId: number;

  @ManyToOne(() => Comments, (comment) => comment.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentId' })
  comment: Comments;
}
