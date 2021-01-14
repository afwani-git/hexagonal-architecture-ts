import { v4 } from 'uuid';
import { TodoFactory } from '../../../Domain/TodoFactory';
import  { TodoModel, TodoModelImpl,  } from './TodoModel';
import { TodoEntity } from '../../../Domain/Entity/TodoEntity';
import { TodoRepositoryImpl } from '../../../Ports/TodoRepositoryImpl';
import {TodoInputDto} from '../../../Application/Dto/TodoInputDto';

class MongooseTodoRepository implements TodoRepositoryImpl{
    private model: typeof TodoModel

    constructor(){
        this.model = TodoModel;
    }
   
    async getTodos(id: string){
        let result: TodoEntity[] = [];
        let data: any[];

        if(id){
         data = await this.model.find({ id });
        }else{
         data = await this.model.find();
        }
        
        data.forEach((doc: TodoModelImpl) => {
            result.push(new TodoFactory().create({
                id: doc.id,
                title: doc.title,
                body: doc.body,
                status: doc.status,
                created_at: doc.created_at.toString(),
            }));
        });
        
        return result;
    }

    async addTodo(data: TodoInputDto){
        const result = await this.model.create({
            id: v4(), 
            title: data.title,
            body: data.body,
            status: data.status
        });

        return new TodoFactory().create({
                id: result.id,
                title: result.title,
                body: result.body,
                status: result.status,
                created_at: result.created_at.toString(),
        });
    }

    async deletTodo(id: string){
     return this.model.deleteOne({ id });
    }


    async updateTodo(id: string, data: TodoInputDto){
        const result =  await this.model.findOneAndUpdate({ id }, { 
            title: data.title,
            body: data.body,
            status: data.status
        });

        return new TodoFactory().create({
            title: data.title,
            body: data.body,
            status: data.status,
            created_at: result.created_at
        })
    }
}

export { MongooseTodoRepository };
