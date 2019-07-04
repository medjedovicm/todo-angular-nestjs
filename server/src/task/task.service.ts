import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) {

    }

    async findAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find({});
    }

    async saveAllTasks(tasks: Task[]) {
        let tasksInDb = await this.taskRepository.find({});

        this.taskRepository.remove(tasksInDb);

        return await this.taskRepository.save(tasks);
    }
}
