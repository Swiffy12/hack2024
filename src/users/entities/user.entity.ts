import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsEmail, IsInt, IsOptional, IsString, Matches } from 'class-validator'

export class User {

	@ApiProperty({
		description: 'Идентификатор пользователя',
		example: 1
	})
	@IsInt()
	@Type(() => Number)
	id: number

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
	@IsInt()
	@Type(() => Number)
	role: number
}
