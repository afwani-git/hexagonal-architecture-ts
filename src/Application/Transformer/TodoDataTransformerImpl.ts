interface TodoDataTransformerImpl{
    write(data: any):void;
    read(): any; 
}

const TodoDataTransformerType = Symbol.for("TodoDataTransformerImpl");

export { TodoDataTransformerImpl, TodoDataTransformerType };
