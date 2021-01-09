import {inject, injectable} from 'inversify';
import {TodoInputDto} from '../Dto/TodoInputDto';
import {TodoRepositoryImpl, TodoRepositoryType} from '../../Ports/TodoRepositoryImpl';
import { TodoDataTransformerImpl, TodoDataTransformerType } from '../Transformer/TodoDataTransformerImpl'

@injectable()
class CommandUpdateTodo{
    constructor(
        @inject(TodoRepositoryType) private todoRepo: TodoRepositoryImpl,
        @inject(TodoDataTransformerType) private dataTransformer: TodoDataTransformerImpl
    ){}

    async execute(id: string, data: TodoInputDto){
        
        const newTodo = await this.todoRepo.updateTodo(id, data);
    
        this.dataTransformer.write(newTodo);

        const result = this.dataTransformer.read();

        return result;
    }
}


export { CommandUpdateTodo };
