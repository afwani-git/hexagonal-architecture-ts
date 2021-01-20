import { CommandGetTodos  } from '../../../Application/Command/CommandGetTodos';
import { CommandAddTodo  } from '../../../Application/Command/CommandAddTodo';
import { CommandUpdateTodo } from '../../../Application/Command/CommandUpdateTodo';
import { CommandDeleteTodo } from '../../../Application/Command/CommandDeleteTodo';

import { MongooseTodoRepository } from '../../Presistance/Mongoose/MongooseTodoRepository';
import { ObjectDataTransformer  } from '../../../Application/Transformer/ObjectDataTransformer';

const resolvers = {
            Query:{
                        getTodo: async (_parent, { id }) => {
                                    return new CommandGetTodos(
                                                new MongooseTodoRepository(),
                                                new ObjectDataTransformer()
                                    ).execute(id);
                        }
            },
            Mutation: {
                        addTodo: async (_parent, { input }) => {
                                    return new CommandAddTodo(
                                                new MongooseTodoRepository(),
                                                new ObjectDataTransformer()
                                    ).execute(input);
                        },
                        updateTodo: async (_parent, { id, input }) => {
                                    return new CommandUpdateTodo(
                                                new MongooseTodoRepository(),
                                                new ObjectDataTransformer()
                                    ).execute(id, input);       
                        },
                        deleteTodo: async (_parent, { id }) => {
                                    new CommandDeleteTodo(
                                                new MongooseTodoRepository(),
                                    ).execute(id);
                                    
                        }
            }
}

export { resolvers  };
