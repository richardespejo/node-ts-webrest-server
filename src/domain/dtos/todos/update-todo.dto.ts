

export class UpdateTodoDTO {

     constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly createdAt?: Date,
    ){}


    get values(){
        const returnObj: {[key:string]:any} = {}

        if(this.text) returnObj.text = this.text;
        if(this.createdAt) returnObj.createdAt = this.createdAt;

        return returnObj;
    }


    static create( props: { [key:string]: any} ): [string?, UpdateTodoDTO? ] {

        const { id , text , createdAt } = props;
        let newCreatedAt = createdAt;

        if(!id || isNaN(Number(id))){
            return ['Id debe ser numerico'];
        }

        if( createdAt ){
            newCreatedAt = new Date( createdAt );
            if( newCreatedAt.toString() === 'Invalid Date' ){
                return ['CreateAt debe ser una fecha válida']
            }
        }

        return [ , new UpdateTodoDTO(text , newCreatedAt)];
    }
}