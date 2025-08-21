

export class CreateTodoDTO {

     constructor(
        public readonly text: string,
    ){}


    static create( props: { [key:string]: any} ): [string?, CreateTodoDTO? ] {

        const { text } = props;

        if( !text ) return ['La propiedad Text es requeridad',];

        return [ , new CreateTodoDTO(text)];
    }

}