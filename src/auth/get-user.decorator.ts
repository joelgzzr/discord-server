import { createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator((data, { args: [ argsElement ] }): User => {
    console.log(argsElement.user)
    return argsElement.user;
})