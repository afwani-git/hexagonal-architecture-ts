
class TodoInputDto{
    constructor(
        public title: string,
        public body: string,
        public status: string,
        public id?: string,
        public created_at?: string,
    ){}
}

export { TodoInputDto  };
