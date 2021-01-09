import { ContainerModule, interfaces, Container } from 'inversify';
import "reflect-metadata";
import {CommandAddTodo} from './Application/Command/CommandAddTodo';
import {CommandUpdateTodo} from './Application/Command/CommandUpdateTodo';
import { CommandDeleteTodo } from './Application/Command/CommandDeleteTodo';
import { TodoRepositoryImpl, TodoRepositoryType } from './Ports/TodoRepositoryImpl';
import {CommandGetTodos} from './Application/Command/CommandGetTodos';
import {TodoDataTransformerImpl, TodoDataTransformerType} from './Application/Transformer/TodoDataTransformerImpl';

//transformer adapt
import {TodoJsonDataTransformer} from './Application/Transformer/JsonDataTransformer';
import {ObjectDataTransformer} from './Application/Transformer/ObjectDataTransformer';

//presistance adapt
import { MongooseTodoRepository } from './Infrastructure/Presistance/Mongoose/MongooseTodoRepository';
import { InMemoryTodoRepository  } from './Infrastructure/Presistance/InMemory/InMemoryTodoRepository';

const TodoModule =  new ContainerModule((
    bind: interfaces.Bind,
    _unbind: interfaces.Unbind,
    _isBound: interfaces.IsBound,
    _rebind: interfaces.Rebind
) => {
    
    //bind ports
    bind<TodoRepositoryImpl>(TodoRepositoryType).to(MongooseTodoRepository);
    
    //bind transformers
    bind<TodoDataTransformerImpl>(TodoDataTransformerType).to(ObjectDataTransformer);

    //service
    bind(CommandAddTodo).toSelf();
    bind(CommandUpdateTodo).toSelf();
    bind(CommandDeleteTodo).toSelf();
    bind(CommandGetTodos).toSelf();

});

export { TodoModule };
