import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  longDescription: string;

  @Column('timestamp')
  date: Date;

  @Column({ length: 500 })
  organizer: string;

  @Column({ length: 500 })
  place: string;

  @Column()
  status: string;


  // Relations

  @ManyToOne(
    () => User,
    ( user ) => user.event,
    { eager: true }
)
user: User
}