import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {

constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {
    
}

    private tasks = []

    async getAllTitles(): Promise<Task[]>{
        return this.taskModel.find().exec()
    }

    async getTask(id: string): Promise<Task> {
        return this.taskModel.findById(id)
    }

    createTask(task: CreateTaskDto): Promise<Task> {
      const newTask = new this.taskModel(task)  
      return newTask.save()
    }

    async removeTask(id: string): Promise<Task> {
      return this.taskModel.findByIdAndRemove(id)  
    }

    async updateTask(id: string, task: UpdateTaskDto): Promise<Task> {
        return this.taskModel.findByIdAndUpdate(id, task, {new: true})
    }

}
