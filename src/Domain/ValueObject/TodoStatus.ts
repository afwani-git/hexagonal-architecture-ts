
enum StatusType{
    UNFINISHED = 'UNFINISHED',
    FINISHED = 'FINISHED'
}

class TodoStatus{
  
    constructor(
        private status: StatusType
    ){}

    getValues(): StatusType{
        return this.status;
    }

    setStatus(status: StatusType): void{
        this.status = status;
    }
}

export { StatusType, TodoStatus };
