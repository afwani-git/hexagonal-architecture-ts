import {TodoRepositoryImpl} from '../../Ports/TodoRepositoryImpl';
import { TodoDataTransformerImpl } from '../Transformer/TodoDataTransformerImpl'

class CommandGetTodos{
    constructor(
        private todoRepo: TodoRepositoryImpl,
        private dataTransformer: TodoDataTransformerImpl
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
