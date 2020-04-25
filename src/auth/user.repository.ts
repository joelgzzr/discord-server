import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { User } from "./user.entity";
import { AuthSignInDto } from "./dto/auth-signin.dto";
import { AuthSignUpDto } from "./dto/auth-signup.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
        const { firstName, lastName, username, password, email, birthday } = authSignUpDto;

        const user = this.create();
        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.birthday = new Date(birthday);
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch(e) {
            if(e.errno === 1062) {
                throw new ConflictException('Username or email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authSignInDto: AuthSignInDto): Promise<string> {
        const { email, password } = authSignInDto;
        const user = await this.findOne({ email });

        if(user && await user.validatePassword(password)) {
            return user.username
        }

        return null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}