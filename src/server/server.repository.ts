import { Server } from "./server.entity";
import { EntityRepository, Repository } from "typeorm";
import { ServerCreateDto } from "./dto/server-create.dto";
import { User } from "src/auth/user.entity";
import { ServerDeleteDto } from "./dto/server-delete.dto";
import { UnauthorizedException } from "@nestjs/common";
import { ServerUpdateDto } from "./dto/server-update.dto";

@EntityRepository(Server)
export class ServerRepository extends Repository<Server> {
    async createServer(serverCreateDto: ServerCreateDto, user: User) {
        const { name, image } = serverCreateDto;

        const server = new Server();
        server.name = name;
        server.image = image;
        server.user = user;
        await server.save();

        delete server.user;

        return server;
    }

    async updateServer(serverUpdateDto: ServerUpdateDto, user: User) {
        const { id, name, image } = serverUpdateDto;
        const serverToUpdate = await this.findOne({ where: { id, ownerId: user.id } });

        if(!serverUpdateDto) throw new UnauthorizedException('Server not found')
        if(name) serverToUpdate.name = name
        if(image) serverToUpdate.image = image;

        await serverToUpdate.save();

        return serverToUpdate;
    }

    async deleteServer(serverDeleteDto: ServerDeleteDto, user: User) {
        const { id } = serverDeleteDto;
        const serverToDelete = await this.findOne({ id, ownerId: user.id });

        if(!serverToDelete)
            throw new UnauthorizedException('You are not the owner of this server');

        await this.delete({ id: serverToDelete.id });
    }
}