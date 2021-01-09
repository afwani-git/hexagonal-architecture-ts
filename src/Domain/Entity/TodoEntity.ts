import { TodoId } from '../ValueObject/TodoId';
import { TodoBody } from '../ValueObject/TodoBody';
import { TodoStatus } from '../ValueObject/TodoStatus';

class  TodoEntity{
    constructor(
        public title: string,
        public body: TodoBody,
        public status: TodoStatus,
        public id?: TodoId,
        public created_at?: Date,
    ){}
}

export  { TodoEntity };
