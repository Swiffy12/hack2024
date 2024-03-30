import { ApiProperty, PickType } from "@nestjs/swagger";
import { Tournament } from "../entities/tournament.entity";
import { IsInt } from "class-validator";
import { Type } from "class-transformer";


export class finishTournamentDto extends PickType(Tournament, ['id', 'winner'] as const) {

    @ApiProperty({
        description: 'Идентификатор игры, которую нужно завершить',
        example: 1
    })
    @IsInt()
    @Type(() => Number)
    gameId: number

}