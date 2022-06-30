import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Comments } from './comments.entity';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ default: null })
  // @ApiProperty()
  // userId: number;

  // @Column({ default: null })
  // @ApiProperty()
  // commentId: number;

  @Column({ default: null })
  @ApiProperty()
  hasLiked: boolean;

  @Column({ default: null })
  @ApiProperty()
  hasDisliked: boolean;


  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Comments, (comment) => comment.likes)
  comment: Comments;


  @Column({ default: null })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null })
  @UpdateDateColumn()
  updatedAt: Date;
}
