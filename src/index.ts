import { BootsrapingServer } from './Infrastructure/Ui/BootstrapingServer';
import { BootsrapingDatabases } from '../src/Infrastructure/Presistance/BootstrapingPresistance';

//server
import { ExpressServer } from '../src/Infrastructure/Ui/RestApi/Server';

//presistance
import {TypeOrmConn } from '../src/Infrastructure/Presistance/Typeorm/TypeOrmConn';

class Server{

    constructor(
        private servers: BootsrapingServer[],
        private databases: BootsrapingDatabases[]
    ){
    }

    run(){
        this.databases.forEach(async database => {
            await database.run()
        })

        this.servers.forEach(server => {
            server.initServer();
        })
    }
}

new Server(
    [
        new ExpressServer()
    ],
    [   
        new TypeOrmConn()
    ]
).run();