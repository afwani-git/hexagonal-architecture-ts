import { injectable } from 'inversify';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Todo from './TodoEntity.entites';
import { TodoRepositoryImpl } from '../../../Ports/TodoRepositoryImpl';
import { TodoFactory } from '../../../Domain/TodoFactory';
import { TodoInputDto } from '../../../Application/Dto/TodoInputDto';

@injectable()
@EntityRepository(Todo)
class TypeormTodoRepository  implements TodoRepositoryImpl{
    
    private repo: Repository<Todo>

    constructor(){
        const repo = getRepository(Todo);
    }

    async getTodos(id: string){
        let result: any[] = [];

        const query = this.repo.createQueryBuilder('todos');

        if(id){
            query.where(id);
        }
        
        const data = await query.getMany();

        data.forEach(data => {

            const todoEntity = new TodoFactory().create({
                title: data.title,
                body: data.body,
                status: data.status,
                id: data.id,
                created_at: data.created_at.toString()
            })

            result.push(todoEntity);
        })
        
        return result;
    }

    async addTodo(data: TodoInputDto){
        const entity =  this.repo.create(data);

        const result = await this.repo.save(entity);

        return new TodoFactory().create({
            ...result,
            created_at: result.created_at.toString()
        });
    }

    async updateTodo(id: string, data: TodoInputDto){
        const isExist = (await this.getTodos(id)).length;           

        if(!isExist) throw new Error('todo not found');

        const isEffected = (await this.repo.update({ id },{ ...data })).affected;
        
        if(isEffected){
            return this.getTodos(id)[0];
        }
    }

    async deletTodo(id: string){
        const result = await (await this.repo.delete({ id })).affected;
        return result == 1 ? true : false ;
    }
}

export { TypeormTodoRepository }