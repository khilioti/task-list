import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {

  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  private tasks = []

  async getAllTitles(): Promise<Task[]> {
    return this.taskModel.find({}, { body: 0, __v: 0 }).exec()
  }

  async getTask(id: string): Promise<Task> {

    let task: Task = await this.cacheManager.get(id);

    if (!task) {
      task = await this.taskModel.findById(id)

      if (!task) {
        throw new HttpException('Task with this id not found', HttpStatus.NOT_FOUND)
      }

      await this.cacheManager.set(id, task, { ttl: 120 });
    }
    return task
  }

  createTask(task: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(task)
    return newTask.save()
  }

  async removeTask(id: string): Promise<Task> {
    return this.taskModel.findByIdAndRemove(id)
  }

  async updateTask(id: string, task: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true })
  }

}
