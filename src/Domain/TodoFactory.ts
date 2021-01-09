import {TodoEntity} from '../Domain/Entity/TodoEntity';
import {TodoInputDto} from '../Application/Dto/TodoInputDto';
import {TodoBody} from './ValueObject/TodoBody';
import { TodoStatus, StatusType } from './ValueObject/TodoStatus';
import {TodoId} from './ValueObject/TodoId';

class TodoFactory{
    create(data: TodoInputDto){
        const status = data.status.toLowerCase() == 'finished' || data.status.toLowerCase() == 'finish' ? StatusType.FINISHED : StatusType.UNFINISHED  ;

        const date = data.created_at ? new Date(data.created_at) : new Date();
        const todoEntity = new TodoEntity(data.title, new TodoBody(data.body), new TodoStatus(status), new TodoId(data.id), date);
    
        return todoEntity;
    }
}

export {TodoFactory};
