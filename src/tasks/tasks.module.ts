import { CacheModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { Task, TaskSchema } from "./schemas/task.schema";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
    providers: [TasksService],
    controllers: [TasksController],
    imports: [
        MongooseModule.forFeature([
            { name: Task.name, schema: TaskSchema }
        ]),
        AuthModule,
        UsersModule,
        CacheModule.register({
            ttl: 30, // seconds
            max: 10, // maximum number of items in cache
        })
    ]
})

export class TsaksModule {

}