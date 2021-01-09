import {TodoInputDto} from '../Dto/TodoInputDto';
import {TodoRepositoryImpl, TodoRepositoryType} from '../../Ports/TodoRepositoryImpl';
import { TodoDataTransformerImpl, TodoDataTransformerType } from '../Transformer/TodoDataTransformerImpl'
import {inject, injectable} from 'inversify';

@injectable()
class CommandAddTodo{
    constructor(
        @inject(TodoRepositoryType) private todoRepo: TodoRepositoryImpl,
        @inject(TodoDataTransformerType) private dataTransformer: TodoDataTransformerImpl
    ){}

     async execute(data: TodoInputDto){
        
        const newTodo = await this.todoRepo.addTodo(data);

        this.dataTransformer.write(newTodo);

        const result = this.dataTransformer.read();

        return result;
    }
}


export { CommandAddTodo };
