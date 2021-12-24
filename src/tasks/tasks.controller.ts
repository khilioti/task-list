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
    Request,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    
    constructor(
        private authService: AuthService,
        private readonly taskService: TasksService
        ) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
   async login(@Request() req) {
     return this.authService.login(req.user)
   }

    @Get()
    @UseInterceptors(CacheInterceptor)
    getAllTitles(): Promise<Task[]> {
        return this.taskService.getAllTitles()
    }
   
    @UseGuards(JwtAuthGuard)
    @Get(':id')
   // @UseInterceptors(CacheInterceptor) // auto cache
    getTask(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTask(id)
    }

   // @UseGuards(LocalAuthGuard)
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
