import { IsEmail, IsString, MinLength, MaxLength, Matches, IsNotEmpty, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class AuthSignUpDto {
    @IsString()
    @IsNotEmpty({
        message: "First Name no puede estar vacio"
    })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @MaxLength(20)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: "Password is too weak" }
    )
    password: string;

    @IsDate()
    @Type(() => Date)
    birthday: Date;
}