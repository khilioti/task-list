import {
    Body,
    CacheInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { AuthGuard } from '@nestjs/passport';


@Controller('tasks')
export class TasksController {
    
    constructor(private readonly taskService: TasksService) {}

    @Get()
    @UseInterceptors(CacheInterceptor)
    getAllTitles(): Promise<Task[]> {
        return this.taskService.getAllTitles()
    }

    @Get(':id')
   // @UseInterceptors(CacheInterceptor) // auto cache
    getTask(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTask(id)
    }

    @UseGuards(AuthGuard('local'))
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
