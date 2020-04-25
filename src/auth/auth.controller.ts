import { Controller, Body, Post, ValidationPipe, Res, Get, UseGuards } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) authSignUpDto: AuthSignUpDto,
        @Res() response: Response
    ): Promise<Response> {
        const { email, password } = authSignUpDto;
        await this.authService.signUp(authSignUpDto);
        const authSignInDto: AuthSignInDto = { email, password }
        const { accessToken } = await this.authService.signIn(authSignInDto);
        response.cookie('token', accessToken, {
            httpOnly: true,
            domain: 'localhost',
            secure: false
        });
        return response.send("Signed Up. Cookie Set.");
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) authSignInDto: AuthSignInDto,
        @Res() response: Response
    ): Promise<Response> {
        const { accessToken } = await this.authService.signIn(authSignInDto);
        response.cookie('token', accessToken, {
            httpOnly: true,
            domain: 'localhost',
            secure: false
        });
        return response.send("Signed In. Cookie Set.");
    }

    @UseGuards(AuthGuard())
    @Get('/me')
    me(@GetUser() user: User): User {
        return this.authService.me(user);
    }

}
