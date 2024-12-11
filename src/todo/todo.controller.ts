import { Controller, Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() body: { title: string; description: string }): Promise<Todo> {
    return this.todoService.create(body.title, body.description);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: { title?: string; description?: string },
  ): Promise<Todo> {
    return this.todoService.update(id, body.title, body.description);
  }

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get('search')
  search(@Query('query') query: string): Promise<Todo[]> {
    return this.todoService.search(query);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.todoService.delete(id);
  }
}