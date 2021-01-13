import { Connection, ConnectionManager, getRepository, createConnection } from 'typeorm';
import { TodoEntity } from './TodoEntity.entites';
import { BootsrapingDatabases } from '../BootstrapingPresistance';

export class TypeOrmConn implements BootsrapingDatabases{

    private static instance: TypeOrmConn;  
    public conn: Connection;
    private connManager: ConnectionManager;

    constructor(){
        this.connManager = new ConnectionManager();
    }

    async run(){
        const connManager = this.connManager.create({
            name: "default",
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "fanifani123",
            database: "hexagonal",
            entities: [
                TodoEntity
            ],
            synchronize: true,
        });

        this.conn = await connManager.connect();
        console.log('db connected !');
        return this;
    }

    static async getIstance() {
        if (!TypeOrmConn.instance) {
            TypeOrmConn.instance = new TypeOrmConn();
            await TypeOrmConn.instance.run();
        }

        return TypeOrmConn.instance.conn;
    }
}