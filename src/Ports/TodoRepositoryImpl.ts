import {TodoEntity} from '../Domain/Entity/TodoEntity';
import {TodoInputDto} from '../Application/Dto/TodoInputDto';

interface TodoRepositoryImpl{
    getTodos(id?: string):  Promise<TodoEntity[]>;
    addTodo(data: TodoInputDto): Promise<TodoEntity>;
    updateTodo(id: string,data: TodoInputDto): Promise<TodoEntity>;
    deletTodo(id: string): Promise<boolean>;
}

const TodoRepositoryType = Symbol('TodoRepositoryImpl');

export { TodoRepositoryImpl, TodoRepositoryType };
