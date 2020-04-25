import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
        return this.userRepository.signUp(authSignUpDto)
    }

    async signIn(authSignInDto: AuthSignInDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authSignInDto);

        if(!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
    
    me(user: User): User {
        delete user.password;
        delete user.salt;

        return user;
    }
}
