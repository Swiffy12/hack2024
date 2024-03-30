import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

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

	async getUserInfo(user: User) {
		return user
	}
}
