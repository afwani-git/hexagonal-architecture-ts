import {Container, ContainerModule} from 'inversify';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { urlencoded, json } from 'express';
import { MongooseDatabase } from './Config/Databases/Mongoose';
import { Databases } from './Config/Databases/DatabasesImpl';
import "./Infrastructure/Ui/RestApi/TodoController";

class Server{
    private server: InversifyExpressServer;
    private container: Container;

    constructor(
        private database: Databases
    ){
        this.database.initDatabases();
        this.container = new Container()
        this.server = new InversifyExpressServer(this.container);
    }


    run(){
        this.server.setConfig((app) => {
            app.use(urlencoded({
                extended: true
            }));

            app.use(json());
        });

        const app = this.server.build();

        app.listen(8080,() => {
            console.log('app running 8080');
        })
    }
}

new Server(new MongooseDatabase()).run();
