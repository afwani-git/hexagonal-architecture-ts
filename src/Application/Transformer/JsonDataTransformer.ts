import {injectable} from 'inversify';
import {TodoEntity} from '../../Domain/Entity/TodoEntity';
import { TodoDataTransformerImpl } from './TodoDataTransformerImpl';

@injectable()
class TodoJsonDataTransformer implements TodoDataTransformerImpl{
    
    private data: string;
    
    constructor(){
        this.data = "";
    }

    write(data: TodoEntity){

        const result = {
                id: data.id?.getValues(),
                title: data.title,
                body: data.body.getValues(),
                status: data.status.getValues(),
                created_at: data.created_at?.toString()
        }

        this.data = JSON.stringify(result);
    }

    read(){
        return this.data;
    }
}

export  { TodoJsonDataTransformer };
