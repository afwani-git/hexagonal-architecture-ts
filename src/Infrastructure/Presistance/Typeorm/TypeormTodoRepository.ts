import { EntityRepository, Connection, getRepository, Repository } from 'typeorm';
import { TodoEntity } from './TodoEntity.entites';
import { TodoRepositoryImpl } from '../../../Ports/TodoRepositoryImpl';
import { TodoFactory } from '../../../Domain/TodoFactory';
import { TodoInputDto } from '../../../Application/Dto/TodoInputDto';
import { TypeOrmConn } from './TypeOrmConn';

@EntityRepository(TodoEntity)
class TypeormTodoRepository  implements TodoRepositoryImpl{
    
    private connection: Promise<Connection> = TypeOrmConn.getIstance();

    private async repo(){
        return (await this.connection).getRepository(TodoEntity);
    }

    async getTodos(id: string){
        let result: any[] = [];

        const query = (await this.repo()).createQueryBuilder('todo');

        if(id){
            query.where("todo.id=:id", { id });
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
        const entity =  (await this.repo()).create(data);

        const result = await (await this.repo()).save(entity);

        return new TodoFactory().create({
            ...result,
            created_at: result.created_at.toString()
        });
    }

    async updateTodo(id: string, data: TodoInputDto){
        const isExist = (await this.getTodos(id)).length;           

        if(!isExist) throw new Error('todo not found');

        const isEffected = (await (await this.repo()).update({ id },{ ...data })).affected;
        
        if(isEffected){
            return this.getTodos(id)[0];
        }
    }

    async deletTodo(id: string){
        const result = await (await (await this.repo()).delete({ id })).affected;
        return result == 1 ? true : false ;
    }
}

export { TypeormTodoRepository }