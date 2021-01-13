import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Todos')
export  class TodoEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    status: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
}
 