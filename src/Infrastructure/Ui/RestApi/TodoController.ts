import { Response, Request } from 'express';

//presistance
// import { MongooseTodoRepository } from '../../Presistance/Mongoose/MongooseTodoRepository';
import { TypeormTodoRepository } from '../../Presistance/Typeorm/TypeormTodoRepository';

//tansformer
import { ObjectDataTransformer } from '../../../Application/Transformer/ObjectDataTransformer';

//todo
import {TodoInputDto} from '../../../Application/Dto/TodoInputDto';

//command
import {CommandAddTodo } from '../../../Application/Command/CommandAddTodo';
import {CommandUpdateTodo } from '../../../Application/Command/CommandUpdateTodo';
import {CommandDeleteTodo } from '../../../Application/Command/CommandDeleteTodo';
import { CommandGetTodos  } from '../../../Application/Command/CommandGetTodos';

export class TodoController{
    
    async getAllTodo(
        req: Request,
        res: Response
    ){
        try{
            const result = await new CommandGetTodos(
                new TypeormTodoRepository(),
                new ObjectDataTransformer()
            ).execute();
            
            res.json({
                data: result
            })
        }catch(err){
            const e: Error = err;
            res.json({
                data:{
                    message: e.message
                }
            })
        }
    }

    async getTodoById(
        req: Request, 
        res: Response
    ){
        try {
            const id = req.params.id;
            const result = await new  CommandGetTodos(
                new TypeormTodoRepository(),
                new ObjectDataTransformer()
            ).execute(id);
            res.json({
                data: result
            })
        } catch (ex) {
            const error: Error = ex;
            res.json({
                data:{
                    message: error.message
                }
            })         
        }
    }

    async createTodo(
        req: Request,
        res: Response
    ){
       try {
           const result = await new CommandAddTodo(
                new TypeormTodoRepository(),
                new ObjectDataTransformer()
            ) .execute({
               ...req.body
           });
            res.json({
                data: result
            })
       } catch (ex) {
            const error: Error = ex;
            res.json({
                data:{
                    message: error.message
                }
            }); 
       }     
    }

    async updateTodo(req: Request,  res: Response,
    ){
       try {
            const id: string = req.body.id;
            const input: TodoInputDto = {
                body: req.body.body,
                title: req.body.title,
                status: req.body.status
            }
            const result = await  new CommandUpdateTodo(
                new TypeormTodoRepository(),
                new ObjectDataTransformer()
            ).execute(id, input);
            res.json({
                data: result
            })
       } catch (ex) {
            const error: Error = ex;
            res.json({
                data:{
                    message: error.message
                }
            }); 
       }     
    }

    async deleteTodo(
      req: Request, 
      res: Response,
    ){
       try {
            const id = req.params.id;

            const result =  await new CommandDeleteTodo(
                new TypeormTodoRepository()
            ).execute(id);
            res.json({
                data: result
            })
       } catch (ex) {
            const error: Error = ex;
            res.json({
                data:{
                    message: error.message
                }
            }); 
       }     
    }


}
