import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Todos')
export default class TodoEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    status: string;

    @Column()
    created_at: Date;
}
