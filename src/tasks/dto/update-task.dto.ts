import { IsNotEmpty } from "class-validator"


export class UpdateTaskDto {
    @IsNotEmpty()
    readonly title: string
    
    @IsNotEmpty()
    readonly body: string
}