import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';


@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
      ) {}
    
      async create(title: string, description: string): Promise<Todo> {
        const todo = this.todoRepository.create({ title, description });
        return this.todoRepository.save(todo);
      }

      async update(id: number, title?: string, description?: string): Promise<Todo> {
        const todo = await this.todoRepository.findOneBy({ id });
        if (!todo) throw new Error('Todo not found');
        if (title) todo.title = title;
        if (description) todo.description = description;
        return this.todoRepository.save(todo);
      }

      async findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
      }

      async search(query: string): Promise<Todo[]> {
        return this.todoRepository
          .createQueryBuilder('todo')
          .where('todo.title ILIKE :query OR todo.description ILIKE :query', { query: `%${query}%` })
          .getMany();
      }


      async delete(id: number): Promise<void> {
        await this.todoRepository.delete(id);
      }
}
