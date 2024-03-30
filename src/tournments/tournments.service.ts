import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createTournamentDto } from './dto/createTournament.dto';
import { finishTournamentDto } from './dto/finishTournament.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TournmentsService {
    constructor(private prisma: PrismaService) {}

    async createOneTournament(tournamentData: createTournamentDto) {
        if (tournamentData.playerIds.length != tournamentData.participantsNumber) {
            throw new ConflictException('Количество участников не совпадает с количеством заявленных игроков')
        }

        const randomPlayers = tournamentData.playerIds.map(player => [Math.random(), player]).sort()
        const players = randomPlayers.map(player => player[1])
        const gamesData: any = []
        for (let i = 0; i < players.length; i += 2) {
            gamesData.push([players[i], players[i+1]])
        }

        const createdTournment = await this.prisma.tournaments.create({
            data: {
                statusId: 1,
                playerIds: tournamentData.playerIds,
                participantsNumber: tournamentData.participantsNumber,
                games: {
                    createMany: {
                        data: gamesData.map(data => ({
                            statusId: 1,
                            playerIds: data
                        }))
                    }
                }
            },
            include: {
                games: true
            }
        });

        return createdTournment;
    }

    async finishOneTournament(finishTournamentData: finishTournamentDto) {
        const findedTournament = await this.prisma.tournaments.findUnique({
            where: {
                id: finishTournamentData.id
            }
        })

        if (!findedTournament) {
            throw new NotFoundException('Турнир не найден')
        }

        

    }

    async getAllTournament() {
        const foundTournament = await this.prisma.tournaments.findMany({
            select: {
                id: true,
                playerIds: true,
                winner: true,
                participantsNumber: true,
                tableStatuses: {
                    select: {
                        status: true
                    }
                }
            }
        })

        const result = foundTournament.map(tournament => ({
            id: tournament.id,
            winner: tournament.winner,
            participantsNumber: tournament.participantsNumber,
            status: tournament.tableStatuses.status,
            playerIds: tournament.playerIds
        }))
        
        return result
    }

    async getOneTournament(id: number) {
        const foundTournament = await this.prisma.tournaments.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                playerIds: true,
                tableStatuses: {
                    select: {
                        status: true
                    }
                }
            }
        })
        const users = await this.getUsersByIds(foundTournament.playerIds)
        foundTournament['status'] = foundTournament.tableStatuses.status
        delete foundTournament.tableStatuses
        delete foundTournament.playerIds
        foundTournament['players'] = users.map(user => ({
            id: user.id,
            nickname: user.nickname,
            role: user.accountRoles.role
        }))
        return foundTournament;
    }

    async getUsersByIds(ids: number[]) {
        const foundUsers = await this.prisma.accounts.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            include: {
                accountRoles: {
                    select: {
                        role: true
                    }
                }
            }
        })
        return foundUsers
    }
}
