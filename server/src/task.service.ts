import { BadRequestException, Injectable } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetTaskResponse } from './dto/response/get-task.response';
import { AddTaskDto } from './dto/request/add-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  @Get()
  async getAll(): Promise<GetTaskResponse[]> {
    const tasks = await this.taskRepository.find({
      order: {
        id: 'ASC',
      },
    });

    return plainToInstance(GetTaskResponse, tasks);
  }

  @Post()
  async create(@Body() body: AddTaskDto) {
    const task = await this.taskRepository.create(body);
    this.taskRepository.save(task);
  }

  @Patch(':id')
  async updateStatus(@Param('id') id: number, @Body() body: Partial<Task>) {
    const task = await this.taskRepository.findOneBy({ id: id });

    if (task) {
      await this.taskRepository.update(id, body);
    } else {
      throw new BadRequestException('Did not find such a task id to delete');
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    const task = this.taskRepository.findOneBy({ id: id });

    if (task) {
      this.taskRepository.delete(id);
    } else {
      throw new BadRequestException('Did not find such a task id to delete');
    }
  }
}
