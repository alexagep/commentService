import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  // ManyToOne,
  // JoinColumn,
  OneToMany,
} from 'typeorm';
import { Comments } from './comments.entity';
// import { Users } from './users.entity';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  @ApiProperty()
  content: string;

  @Column({ default: null })
  @ApiProperty()
  senderId: number;

  // @ManyToOne(() => Users, (user) => user.posts)
  // @JoinColumn({ referencedColumnName: 'id' })
  // user: Users;

  @OneToMany(() => Comments, (comment) => comment.post)
  comments: Comments[];

  @Column({ default: null })
  @CreateDateColumn()
  postedAt: Date;
}
