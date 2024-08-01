import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AddTaskDto } from './dto/request/add-task.dto';
import { GetTaskResponse } from './dto/response/get-task.response';

@Controller('api')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll(): Promise<GetTaskResponse[]> {
    return this.taskService.getAll();
  }

  @Post('create')
  create(@Body() body: AddTaskDto): Promise<void> {
    return this.taskService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.taskService.updateStatus(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
