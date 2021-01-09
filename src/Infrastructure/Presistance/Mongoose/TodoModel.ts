import { Schema, model, Document } from 'mongoose';

interface TodoModelImpl extends Document{
    id: string,
    title: string,
    body: string,
    status: string,
    created_at: Date
}

const TodoSchema = new Schema({
    id: 'string',
    title: {
        type: 'string',
        maxlength: '30',
    },
    body: {
        type: 'string',
        maxlength: '30',
    },
    status: {
        type: 'string',
        maxlength: '30'
    },
    created_at:{ type: Date, default: Date.now }
});

TodoSchema.path('id');

const TodoModel = model<TodoModelImpl>('todo', TodoSchema);

export { TodoModel, TodoSchema, TodoModelImpl }
