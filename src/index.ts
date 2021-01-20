import { BootsrapingServer } from './Infrastructure/Ui/BootstrapingServer';
import { BootsrapingDatabases } from '../src/Infrastructure/Presistance/BootstrapingPresistance';

//server
import { ExpressServer } from '../src/Infrastructure/Ui/RestApi/Server';
import {  GraphqlServer  } from '../src/Infrastructure/Ui/Graphql/Server';

//presistance
//import {TypeOrmConn } from '../src/Infrastructure/Presistance/Typeorm/TypeOrmConn';
import { MongooseConn } from '../src/Infrastructure/Presistance/Mongoose/MongooseConnect';

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

        this.servers.forEach(async server => {
            await server.initServer();
        })
    }
}

new Server(
    [
        new ExpressServer(),
        new GraphqlServer()
    ],
    [   
//        new TypeOrmConn()
         new MongooseConn()
    ]
).run();
