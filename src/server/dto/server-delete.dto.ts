import { IsNotEmpty, IsNumber } from "class-validator";

export class ServerDeleteDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}