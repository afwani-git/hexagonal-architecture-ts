import { Router } from 'express';
import { TodoController } from './TodoController';

const router = Router({
    caseSensitive: true
});
const controller = new TodoController();

router.get('/', controller.getAllTodo);
router.get('/:id', controller.getTodoById);
router.post('/add',controller.createTodo);
router.post('/update', controller.updateTodo);
router.delete('/delete/:id', controller.deleteTodo);

export { router }