import { Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Авторизация пользователя' })
	@ApiOkResponse({ description: 'Пользователь успешно авторизовался' })
	@ApiUnauthorizedResponse({ description: 'Неправильные данные авторизации' })
	@Post('login')
	async login(@Query() query: LoginDto) {
		return await this.authService.signIn(query)
	}

    @ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiOkResponse({ description: 'Пользователь успешно зарегестрирован' })
	@ApiConflictResponse({ description: 'Данный пользователь уже существует' })
	@Post('registration')
	async registration(@Query() query: RegisterDto) {
		return await this.authService.register(query)
	}
}
