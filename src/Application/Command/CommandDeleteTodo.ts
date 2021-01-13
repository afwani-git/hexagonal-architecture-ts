import {TodoRepositoryImpl, TodoRepositoryType} from '../../Ports/TodoRepositoryImpl';

class CommandDeleteTodo{
    constructor(
        private todoRepo: TodoRepositoryImpl,
    ){}

    async execute(id: string){

        const isDeleted = await this.todoRepo.deletTodo(id);

        if(!isDeleted) throw new Error("todo id not found");

    }
}


export {CommandDeleteTodo };
