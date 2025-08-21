import { prisma } from '../../data/postgres';
import { Request, Response } from "express";
import { CreateTodoDTO, UpdateTodoDTO } from '../../domain/dtos';

export class TodosController {


    constructor(){}


    public getTodos = async( req: Request , res: Response) => {

        const todos = await prisma.todo.findMany();
        return res.json(todos);

    }

    public getTodoById = async( req: Request , res: Response) => {
        const id  = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({ error: 'El argumento ID no es un numero'})

        const todo = await prisma.todo.findFirst({
            where: { id }
        });


        (todo) ? res.status(200).json(todo) : res.status(404).json({ error: `Todo no se consigue con el id: ${id}` });

    }


    public createTodo = async( req: Request , res: Response) => {
        const [error, createTodoDTO] = CreateTodoDTO.create(req.body);

        if(error) return res.status(400).json({error});

        const todo = await prisma.todo.create({
            data: createTodoDTO!
        });

        res.json(todo);

    }

    public updateTodo = async( req: Request , res: Response) => {
        const id  = Number(req.params.id);
        const [error , updateTodoDTO ] = UpdateTodoDTO.create({ ...req.body , id})

        if(error) return res.status(400).json({error});

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if( !todo ) return res.status(404).json({ error: `El ID ${id} no existe`});


        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDTO!.values
        })

        res.json(updatedTodo);

    }

    public deleteTodo = async( req: Request , res: Response) => {
        const id  = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({ error: 'El argumento ID no es un numero'});

        const todo = await prisma.todo.findFirst({
            where: { id }
        });        
        
        if( !todo ) return res.status(404).json({ error: `El ID ${id} no existe`});

        const deleted = await prisma.todo.delete({
            where: {id}
        });

        ( deleted )
            ? res.json(deleted)
            : res.status(400).json({ error: `el Id ${id} no existe` })

    }


}