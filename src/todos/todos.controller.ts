import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAllTodos() {
    return this.todosService.getAllTodos();
  }

  @Post()
  addTodo(@Body('description') desc: string) {
    const newTodoId = this.todosService.insertTodo(desc);
    return { id: newTodoId };
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body('description') desc: string,
    @Body('complete') complete: boolean = false,
  ) {
    this.todosService.updateTodo(id, desc, complete);
    return null;
  }

  @Delete(':id')
  deleteTodo(@Param('id') todoId: string) {
    this.todosService.deleteTodo(todoId);
    return null;
  }
}
