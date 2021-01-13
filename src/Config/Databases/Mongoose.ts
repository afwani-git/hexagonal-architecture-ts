import * as mongoose from 'mongoose';
import { Databases } from './DatabasesImpl';

class MongooseDatabase implements Databases{

    async initDatabases(){
        try {
            await mongoose.connect('mongodb://localhost:27017/hexagonal', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
            console.log("database connected !");
        } catch (error) {
          console.log(error);
        }
    }

}

export { MongooseDatabase }