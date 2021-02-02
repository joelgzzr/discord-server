import { Controller, Post, Body, UseGuards, Delete, Patch, Get, ParseIntPipe, Param } from '@nestjs/common';
import { ServerService } from './server.service';
import { Server } from './server.entity'
import { ServerCreateDto } from './dto/server-create.dto';
import { ServerDeleteDto } from './dto/server-delete.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ServerUpdateDto } from './dto/server-update.dto';

@Controller('server')
@UseGuards(AuthGuard())
export class ServerController {
    constructor(
        private serverService: ServerService
    ) {}

    @Get('/:id')
    async getServerById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Server> {
        return this.serverService.getServerById(id);
    }

    @Post()
    async createServer(
        @Body() serverCreateDto: ServerCreateDto,
        @GetUser() user: User
    ): Promise<Server> {
        return this.serverService.createServer(serverCreateDto, user);
    }

    @Patch()
    async updateServer(
        @Body() serverUpdateDto: ServerUpdateDto,
        @GetUser() user: User
    ): Promise<Server> {
        return this.serverService.updateServer(serverUpdateDto, user);
    }

    @Delete()
    async deleteServer(
        @Body() serverDeleteDto: ServerDeleteDto,
        @GetUser() user: User
    ): Promise<void> {
        return this.serverService.deleteServer(serverDeleteDto, user);
    }

}
