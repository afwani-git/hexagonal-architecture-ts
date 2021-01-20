import * as express from 'express';
import { Application, application, urlencoded, json } from 'express';
import { BootsrapingServer } from '../BootstrapingServer';
import { router } from './Router';

export class ExpressServer implements BootsrapingServer{
    private app: Application;

    constructor(){
        this.app = express();
    }

    async initServer(){
        
        this.app.use(urlencoded({ extended: true}));
        this.app.use(json());

        this.app.use('/', router);

        this.app.listen(8080);

        console.log('express connected');
    }
}
