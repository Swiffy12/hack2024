import { PickType } from "@nestjs/swagger";
import { Tournament } from "../entities/tournament.entity";


export class createTournamentDto extends PickType(Tournament, ['participantsNumber', 'playerIds'] as const) {}