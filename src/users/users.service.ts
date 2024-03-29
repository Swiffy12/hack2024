import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOneUser(nickname: string) {
		const findOneUser = await this.prisma.accounts.findUnique({
			where: {
				nickname: nickname,
			},
		})

		return findOneUser
	}
}
