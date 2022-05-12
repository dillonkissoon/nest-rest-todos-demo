import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todos.model';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  // returns all the todos
  getAllTodos(): Todo[] {
    return [...this.todos];
  }

  // add a todo
  insertTodo(description: string) {
    const todoId = this.todos.length + 1;
    const newTodo = new Todo(todoId.toString(), description);
    this.todos.push(newTodo);
    return todoId;
  }

  updateTodo(id: string, description: string, complete: boolean = false) {
    const [todo, todoIndex] = this.findTodo(id);
    const updatedTodo = { ...todo, complete };
    if (description) updatedTodo.description = description;
    this.todos[todoIndex] = updatedTodo;
  }

  deleteTodo(id: string) {
    const [_, todoIndex] = this.findTodo(id);
    this.todos.splice(todoIndex, 1);
  }

  private findTodo(id: string): [Todo, number] {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    const todo = this.todos[todoIndex];
    if (!todo) throw new NotFoundException('could not find todo');
    return [todo, todoIndex];
  }
}
