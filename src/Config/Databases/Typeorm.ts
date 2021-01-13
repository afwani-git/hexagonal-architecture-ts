import { ConnectionManager, Connection } from 'typeorm';
import { Databases } from './DatabasesImpl';
import { TodoEntity } from '../../Infrastructure/Presistance/Typeorm/TodoEntity.entites';


export class TypeOrmDriver implements Databases{

    public conn: Connection;
    private connManager: ConnectionManager;

    constructor(){
        this.connManager = new ConnectionManager();
        this.initDatabases();
    }

    getConnection(){
        return this.conn;
    }

    initDatabases(){
        try{
            const createConn = this.connManager.create({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "fanifani123",
                database: "hexagonal",
                entities: [
                    TodoEntity
                ],
                synchronize: true
            });
            createConn.connect().then( conn => {
                console.log("database connected");
                this.conn = conn;
            });
        }catch(err){
            console.log(err);
        }

    }

}