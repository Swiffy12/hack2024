import { Body, Controller, Get, Param, ParseIntPipe, Post, Response } from '@nestjs/common';
import { TournmentsService } from './tournments.service';
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { createTournamentDto } from './dto/createTournament.dto';
import { finishTournamentDto } from './dto/finishTournament.dto';
import { Public } from 'src/constants/constants';

@ApiTags('tournaments')
@Controller('tournaments')
export class TournmentsController {
    constructor(private readonly tournmentsService: TournmentsService) {}

    @ApiOperation({ summary: 'Получение всех турниров независимо от статусов' })
    @ApiOkResponse({ description: 'Список турнирова успешно получен' })
    @Get()
    @Public()
    async getTournaments() {
        return await this.tournmentsService.getAllTournament()
    }

    @ApiOperation({ summary: 'Получение одного турнира' })
    @ApiOkResponse({ description: 'Турнир успешно получен' })
    @Get('one/:id')
    async getTournament(@Param('id', new ParseIntPipe()) id: number) {
        return await this.tournmentsService.getOneTournament(id)
    }

    @ApiOperation({ summary: 'Создание турнира' })
    @ApiCreatedResponse({ description: 'Турнир успешно создан' })
    @ApiConflictResponse({ description: 'Количество участников не совпадает с количеством заявленных игроков' })
    @Post('create')
    @Roles(Role.Admin)
    async createTournament(@Body() tournamentData: createTournamentDto) {
        return await this.tournmentsService.createOneTournament(tournamentData)
    }

    @ApiOperation({ summary: 'Завершение турнира' })
    @ApiOkResponse({ description: 'Турнир успешно завершен' })
    @Post('finish')
    @Roles(Role.Admin)
    async finishTournament(@Body() finishTournamentData: finishTournamentDto) {
        return await this.tournmentsService.finishOneTournament(finishTournamentData)
    }
}
