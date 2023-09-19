import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'abc'})
  @Column()
  name: string;

  @ApiProperty({ description: 'xyz@gmail.com'})
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: '30'})
  @Column()
  age: Number

}
