import {TodoInputDto} from '../Dto/TodoInputDto';
import {TodoRepositoryImpl } from '../../Ports/TodoRepositoryImpl';
import { TodoDataTransformerImpl } from '../Transformer/TodoDataTransformerImpl'
import {inject, injectable} from 'inversify';

class CommandAddTodo{
    constructor(
        private todoRepo: TodoRepositoryImpl,
        private dataTransformer: TodoDataTransformerImpl
    ){}

     async execute(data: TodoInputDto){
        
        const newTodo = await this.todoRepo.addTodo(data);

        this.dataTransformer.write(newTodo);

        const result = this.dataTransformer.read();

        return result;
    }
}


export { CommandAddTodo };
