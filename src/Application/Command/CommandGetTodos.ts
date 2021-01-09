import {inject, injectable} from 'inversify';
import {TodoRepositoryImpl, TodoRepositoryType} from '../../Ports/TodoRepositoryImpl';
import { TodoDataTransformerImpl, TodoDataTransformerType } from '../Transformer/TodoDataTransformerImpl'

@injectable()
class CommandGetTodos{
    constructor(
        @inject(TodoRepositoryType) private todoRepo: TodoRepositoryImpl,
        @inject(TodoDataTransformerType) private dataTransformer: TodoDataTransformerImpl
    ){}

    async execute(id?: string){
        const result: any[] = [];

        const todos = await this.todoRepo.getTodos(id);

        todos.forEach(todo => {
            this.dataTransformer.write(todo);
            result.push(this.dataTransformer.read());
        });

        return result;
    }
}


export { CommandGetTodos };
