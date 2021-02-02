import { IsString, IsNotEmpty } from "class-validator";

export class ServerCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    image: string;
}