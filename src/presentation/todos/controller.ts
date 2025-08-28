import { prisma } from '../../data/postgres';
import { Request, Response } from "express";
import { CreateTodoDTO, UpdateTodoDTO } from '../../domain/dtos';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from '../../domain';

export class TodosController {


    constructor(
        private readonly todoRepository: TodoRepository
    ){}


    public getTodos = ( req: Request , res: Response) => {
    
        new GetTodos( this.todoRepository )
            .execute()
            .then( todos => res.json(todos))
            .catch( error => res.status(400).json({error}));
    };

    public getTodoById = ( req: Request , res: Response) => {
        const id  = Number(req.params.id);
        
        new GetTodo( this.todoRepository)
            .execute(id)
            .then( todo => res.json(todo))
            .catch( error => res.status(400).json({error}));
    };


    public createTodo = ( req: Request , res: Response) => {
        const [error, createTodoDto] = CreateTodoDTO.create(req.body);

        if(error) return res.status(400).json({error});

        new CreateTodo( this.todoRepository )
            .execute( createTodoDto! )
            .then( todo => res.json(todo))
            .catch( error => res.status(400).json({error}))
    };

    public updateTodo = ( req: Request , res: Response) => {
        const id  = Number(req.params.id);
        const [error , updateTodoDto ] = UpdateTodoDTO.create({ ...req.body , id})

        if(error) return res.status(400).json({error});

        new UpdateTodo( this.todoRepository )
            .execute( updateTodoDto! )
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}));
    };

    public deleteTodo = ( req: Request , res: Response) => {
        const id  = Number(req.params.id);

        new DeleteTodo( this.todoRepository )
            .execute(id)
            .then( todo => res.json(todo) )
            .catch( error => res.status(400).json({error}) )
    };


}