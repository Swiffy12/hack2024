import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GamesService {

    constructor(private prisma: PrismaService) {

    }

    async updateOneGame(id: number, body) {
        const updatedGame = this.prisma.games.update({
            where: {
                id: id
            },
            data: {
                score: body.score,
                statusId: body.statusId,
                winner: body.winner
            }
        })
        return updatedGame
    }

}
