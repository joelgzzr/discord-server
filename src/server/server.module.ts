import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ServerRepository } from './server.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerRepository]),
    AuthModule
  ],
  providers: [ServerService],
  controllers: [ServerController]
})
export class ServerModule {}
