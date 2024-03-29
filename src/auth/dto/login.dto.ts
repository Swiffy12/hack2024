import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsString } from 'class-validator'


export class LoginDto {

	@ApiProperty({
		description: 'Никнейм',
		example: 'qwerty',
	})
	@IsString()
	@Transform(({ value }) => value?.trim())
	nickname: string

	@ApiProperty({
		description: 'Пароль',
		example: 'qwerty',
	})
	@IsString()
	@Transform(({ value }) => value?.trim())
	password: string
}
