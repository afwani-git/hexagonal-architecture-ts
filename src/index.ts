import {Container, ContainerModule} from 'inversify';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { urlencoded, json } from 'express';
import mongoose from 'mongoose';
import { TodoModule } from './TodoContainerModule';
import "./Infrastructure/Ui/RestApi/TodoController";

class Server{
    private server: InversifyExpressServer;
    private container: Container;

    constructor(){
        this.container = new Container();
        this.initDatabases();
        this.server = new InversifyExpressServer(this.container);
    }

    loadModule(modules: ContainerModule[]){
        this.container.load(...modules);
        return this;
    }

    private async initDatabases(){
        try {
            await mongoose.connect('mongodb://localhost:27017/hexagonal', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
            console.log("database connected !");
        } catch (error) {
          console.log(error);
        }
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

new Server().loadModule([
    TodoModule
]).run();
