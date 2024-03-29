import * as bcrypt from 'bcrypt'
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private prisma: PrismaService
	) {}


    async signIn(query: LoginDto) {

		const userData = await this.usersService.findOneUser(query.nickname)

		if (!userData) {
			throw new UnauthorizedException('Неправильные данные авторизации')
		}

		const isMatch = await bcrypt.compare(query.password, userData.passwordHash)

		if (!isMatch) {
			throw new UnauthorizedException('Неправильные данные авторизации')
		}

		const payload = {
			id: userData.id,
			username: userData.nickname,
			role: userData.roleId,
		}

		return {
			access_token: this.jwtService.sign(payload),
		}
	}

	async register(query: RegisterDto) {
		const userData = await this.usersService.findOneUser(query.nickname)

		if (userData) {
			throw new ConflictException('Данный пользователь уже существует')
		}

		const saltOfRounds = 10;
		const passwordHash = await bcrypt.hash(query.password, saltOfRounds)

		const result = await this.prisma.accounts.create({
			data: {
				nickname: query.nickname,
				passwordHash: passwordHash,
				roleId: 2
			}
		})

		return result
	}
}
