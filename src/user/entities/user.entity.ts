import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, UpdateQueryBuilder } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('character varying', { name: 'username', length: 64 })
    username: string;

    @Column('character varying', { name: 'password', length: 128 })
    password: string;

    @Column('character varying', { name: 'name', nullable: true, length: 128 })
    name: string;

    @Column('character varying', { name: 'email', length: 100 })
    email: string;

    @Column({ name: 'date of birth' })
    dob: Date;

    @Column('character varying', { name: 'gender', length: 10})
    gender: string;

    @Column('character varying', { name: 'phone', length: 20 })
    phone: string;

    @Column('character varying', { name: 'address' })
    address: string;

    @Column('timestamp with time zone', { name: 'last_login' })
    lastLogin: Date;
  
    @Column('timestamp with time zone', { name: 'date_joined' })
    dateJoined: Date;
}
