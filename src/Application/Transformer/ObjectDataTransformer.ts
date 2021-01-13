import {TodoEntity} from '../../Domain/Entity/TodoEntity';
import { TodoDataTransformerImpl } from './TodoDataTransformerImpl';

class ObjectDataTransformer implements TodoDataTransformerImpl{
    
    private data: any;
    
    constructor(){
        this.data = {};
    }

    write(data: TodoEntity){

        const result = {
                id: data.id?.getValues(),
                title: data.title,
                body: data.body.getValues(),
                status: data.status.getValues(),
                created_at: data.created_at?.toString()
        }

        this.data = result;
    }

    read(){
        return this.data;
    }
}

export  { ObjectDataTransformer };
