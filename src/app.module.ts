import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TsaksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TsaksModule, 
    MongooseModule.forRoot(`mongodb+srv://tasks:QdvNMHJljWI0MmNU@cluster0.qa7ck.mongodb.net/myTasks?retryWrites=true&w=majority`), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
