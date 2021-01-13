import { Response, Request } from 'express';
import { httpGet, httpPost, request, requestParam, response, controller, interfaces } from 'inversify-express-utils';

//presistance
import { MongooseTodoRepository } from '../../Presistance/Mongoose/MongooseTodoRepository';
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

@controller('/')
export class TodoController implements interfaces.Controller{
    
    @httpGet('')
    async getAllTodo(
        @request() req: Request, @response() res: Response
    ){
        try{
            const result = new CommandGetTodos(
                new MongooseTodoRepository(),
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


    @httpGet(':id')
    async getTodoById(
        @request() req: Request, 
        @response() res: Response,
        @requestParam('id') id: string
    ){
        try {
            const result = await new  CommandGetTodos(
                new MongooseTodoRepository(),
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

    @httpPost('add')
    async createTodo(
        @request() req: Request, @response() res: Response
    ){
       try {
           const result = await new CommandAddTodo(
                new MongooseTodoRepository(),
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

    @httpPost('update')
    async updateTodo(
       @request() req: Request, 
       @response() res: Response,
    ){
       try {
            const id: string = req.body.id;
            const input: TodoInputDto = {
                body: req.body.body,
                title: req.body.title,
                status: req.body.status
            }
            const result = await  new CommandUpdateTodo(
                new MongooseTodoRepository(),
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

    @httpGet('delete/:id')
    async deleteTodo(
       @request() req: Request, 
       @response() res: Response,
       @requestParam('id') id: string
    ){
       try {
            const result =  await new CommandDeleteTodo(
                new MongooseTodoRepository()
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
