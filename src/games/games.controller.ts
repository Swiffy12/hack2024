import { Body, Controller, Param, Patch } from '@nestjs/common';
import { GamesService } from './games.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @ApiOperation({ summary: 'Обновление игры' })
    @ApiOkResponse({ description: 'Игра успешно обновлена' })
    @Patch(':id')
    async updateGame(@Param('id') id: number, @Body() body: any) {
        return await this.gamesService.updateOneGame(id, body)
    }


}
