import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TaskDocument = Task & Document

@Schema()
export class Task {
    @Prop()
    title: string

    @Prop()
    body: string
}

export const TaskSchema = SchemaFactory.createForClass(Task)