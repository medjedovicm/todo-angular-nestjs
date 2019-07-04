import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) {

    }

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return await this.taskService.findAllTasks();
    }

    @Post("save")
    async saveAllTasks(@Body() tasks: Task[]) {
        return await this.taskService.saveAllTasks(tasks);
    }
}
