import { IsString, IsEmail } from "class-validator";

export class AuthSignInDto {
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;
}