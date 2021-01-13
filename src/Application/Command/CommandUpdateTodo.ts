import {TodoInputDto} from '../Dto/TodoInputDto';
import {TodoRepositoryImpl } from '../../Ports/TodoRepositoryImpl';
import { TodoDataTransformerImpl  } from '../Transformer/TodoDataTransformerImpl'


class CommandUpdateTodo{
    constructor(
        private todoRepo: TodoRepositoryImpl,
        private dataTransformer: TodoDataTransformerImpl
    ){}

    async execute(id: string, data: TodoInputDto){
        
        const newTodo = await this.todoRepo.updateTodo(id, data);
    
        this.dataTransformer.write(newTodo);

        const result = this.dataTransformer.read();

        return result;
    }
}


export { CommandUpdateTodo };
