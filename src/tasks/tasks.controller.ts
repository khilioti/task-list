import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';


@Controller('tasks')
export class TasksController {
    
    constructor(private readonly taskService: TasksService) {}

    @Get()
    getAllTitles(): Promise<Task[]> {
        return this.taskService.getAllTitles()
    }

    @Get(':id')
    getTask(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTask(id)
    }

    @Post()
    createTask(@Body() createTask: CreateTaskDto) : Promise<Task> {
        return this.taskService.createTask(createTask)
    }

    @Delete(':id')
    removeTask(@Param('id') id: string) : Promise<Task> {
        return this.taskService.removeTask(id)
    }

    @Put(':id')
    updateTask(@Body() updateTask: UpdateTaskDto, @Param('id') id: string) : Promise<Task> {
        return this.taskService.updateTask(id, updateTask)
    }
}
