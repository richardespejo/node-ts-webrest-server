import { Params } from './../../../node_modules/@types/express-serve-static-core/index.d';
import { Request, Response } from "express";


const todos = [
            { id: 1 , text: 'Necesito una casa' , createdAt: new Date() },
            { id: 2 , text: 'Necesito un vehiculo' , createdAt: new Date() },
            { id: 3 , text: 'Necesito una moto' , createdAt: new Date() },
            { id: 4 , text: 'Necesito comida' , createdAt: new Date() },
            { id: 5 , text: 'Necesito un mejor empleo' , createdAt: null },
        ]


export class TodosController {


    constructor(){}


    public getTodos = ( req: Request , res: Response) => {

        return res.json(todos);

    }

    public getTodoById = ( req: Request , res: Response) => {
        const id  = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({ error: 'El argumento ID no es un numero'})

        const todo = todos.find( todo => todo.id === id);

        (todo) ? res.status(200).json(todo) : res.status(404).json({ error: `Todo no se consigue con el id: ${id}` });

    }


    public createTodo = ( req: Request , res: Response) => {
        const {text} = req.body;
        if(!text) return res.status(400).json({ error: 'La propiedad text es requerida'});

        const newTodo = {
            id: todos.length +1,
            text: text,
            createdAt: null
        }

        todos.push(newTodo);
        res.json(newTodo);

    }

    public updateTodo = ( req: Request , res: Response) => {
        const id  = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({ error: 'El argumento ID no es un numero'});

        const todo = todos.find( todo => todo.id === id);
        if( !todo ) return res.status(404).json({ error: `El ID ${id} no existe`});

        const { text , createdAt } = req.body;

        todo.text = text || todo.text;
        ( createdAt === 'null' ) 
                ? todo.createdAt = null 
                : todo.createdAt = new Date( createdAt || todo.createdAt );

        res.json(todo);

    }

    public deleteTodo = ( req: Request , res: Response) => {
        const id  = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({ error: 'El argumento ID no es un numero'});

        const todo = todos.find( todo => todo.id === id);
        if( !todo ) return res.status(404).json({ error: `El ID ${id} no existe`});

        todos.splice( todos.indexOf(todo) , 1);

        res.json(todo);

    }


}