import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Comments } from './comments.entity';
import { Users } from './users.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  @ApiProperty()
  content: string;

  @Column({ default: null })
  @ApiProperty()
  senderId: number;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Comments[];

  @Column({ default: null })
  @CreateDateColumn()
  postedAt: Date;
}
