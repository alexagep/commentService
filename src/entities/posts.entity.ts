import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Comments } from './comments.entity';

@Entity('posts')
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @ApiProperty()
  content: string;

  @Column({ nullable: true })
  @ApiProperty()
  senderId: number;

  @OneToMany(() => Comments, (comment) => comment.post)
  comments: Comments[];

  @Column({ default: null })
  @CreateDateColumn()
  postedAt: Date;
}
