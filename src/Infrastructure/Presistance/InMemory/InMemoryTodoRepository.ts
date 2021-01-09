import {injectable} from 'inversify';
import {TodoInputDto} from '../../../Application/Dto/TodoInputDto';
import {TodoEntity} from '../../../Domain/Entity/TodoEntity';
import {TodoFactory} from '../../../Domain/TodoFactory';
import {TodoRepositoryImpl} from '../../../Ports/TodoRepositoryImpl';

@injectable()
class InMemoryTodoRepository implements TodoRepositoryImpl{

    private data: TodoEntity[];

    constructor(){
        this.data = [];
    }

    async addTodo(data: TodoInputDto){
       const newTodo = new TodoFactory().create(data); 
        
       this.data.push(newTodo);

       return newTodo;

    }

    async getTodos(id?: string){
        
        let result: TodoEntity[];

        if(id){
            result = this.data.filter(data => data.id?.getValues() == id);
        }else{
            result = this.data;
        }
        
        return result;
    }

    async deletTodo(id: string){
        this.data = this.data.filter(data => data.id?.getValues() != id);

        return true;
    }

    async updateTodo(id: string, data: TodoInputDto){
        this.data.map((todo) => {
            if(todo.id?.getValues() == id){
                Object.assign(todo, {
                    ...data
                })
            }
        });

        const result = await this.getTodos(id);

        return result[0];
    }

}

export { InMemoryTodoRepository }
