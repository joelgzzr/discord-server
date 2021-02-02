import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class ServerUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    image: string;
}