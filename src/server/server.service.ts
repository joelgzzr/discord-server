import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerRepository } from './server.repository';
import { ServerCreateDto } from './dto/server-create.dto';
import { User } from 'src/auth/user.entity';
import { Server } from './server.entity';
import { ServerDeleteDto } from './dto/server-delete.dto';
import { ServerUpdateDto } from './dto/server-update.dto';

@Injectable()
export class ServerService {
    constructor(
        @InjectRepository(ServerRepository)
        private serverRepository: ServerRepository
    ) {}

    async getServerById(id: number) {
        return this.serverRepository.findOne({ where: { id } });
    }

    async createServer(serverCreateDto: ServerCreateDto, user: User): Promise<Server> {
        return this.serverRepository.createServer(serverCreateDto, user);
    }

    async updateServer(serverUpdateDto: ServerUpdateDto, user: User): Promise<Server> {
        return this.serverRepository.updateServer(serverUpdateDto, user);
    }

    async deleteServer(serverDeleteDto: ServerDeleteDto, user: User): Promise<void> {
        return this.serverRepository.deleteServer(serverDeleteDto, user);
    }
}
