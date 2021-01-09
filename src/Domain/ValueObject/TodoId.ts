import * as uuid from 'uuid';

class TodoId{
    constructor(
        private id?: string
    ){
        if(!this.id){
            this.id = uuid.v4().toString();
        }else{
            this.validateValue(this.id);
        }
    }

    private validateValue(value: string): boolean{
        const isValid = uuid.validate(value);

        if(!isValid){
            throw new Error('invalid uuid');
        }
        
        return  isValid;
    }

    getValues(){
        return this.id!;
    }
}


export { TodoId };
