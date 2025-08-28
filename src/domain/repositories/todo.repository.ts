import { UpdateTodoDTO } from './../dtos/todos/update-todo.dto';
import { CreateTodoDTO } from './../dtos/todos/create-todo.dto';
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {

    abstract create( createTodoDto : CreateTodoDTO ): Promise<TodoEntity>;

    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById( id: number ): Promise<TodoEntity>;

    abstract updateById( updateTodoDto : UpdateTodoDTO): Promise<TodoEntity>;

    abstract deleteById( id: number): Promise<TodoEntity>;
}