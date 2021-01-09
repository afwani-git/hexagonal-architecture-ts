export class TodoBody{
    constructor(
       private body: string
    ){}

    public limitWords(length: number): string{
        const result =  this.body.substr(0, length);
        return result + "...";
    }

    public getValues(): string{
        return this.body;
    }
}
