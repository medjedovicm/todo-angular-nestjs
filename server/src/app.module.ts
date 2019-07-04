import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path'

import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { Task } from './task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'mihajlo_todo',
      entities: [path.join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Task
    ])
  ],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService],
})
export class AppModule {}
