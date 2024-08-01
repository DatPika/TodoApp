import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  COMPLETE = 'complete',
  INCOMPLETE = 'incomplete',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.INCOMPLETE,
  })
  status: Status;
}
