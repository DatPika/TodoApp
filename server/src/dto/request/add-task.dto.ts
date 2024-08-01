import { IsString } from 'class-validator';

export class AddTaskDto {
  @IsString()
  name: string;
}
