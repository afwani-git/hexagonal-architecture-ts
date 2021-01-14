import * as mongoose from 'mongoose';
import { BootsrapingDatabases } from '../BootstrapingPresistance';

export class MongooseConn implements BootsrapingDatabases{
    async run(){
        try {
            await mongoose.connect('mongodb://localhost:27017/hexagonal', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
            console.log("database connected !");
        } catch (error) {
          console.log(error);
        }
    }
}