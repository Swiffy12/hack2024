import { Module } from '@nestjs/common';
import { TournmentsService } from './tournments.service';
import { TournmentsController } from './tournments.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [TournmentsController],
    providers: [TournmentsService, PrismaService],
})
export class TournmentsModule {}
