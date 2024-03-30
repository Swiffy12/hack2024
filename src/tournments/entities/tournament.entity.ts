import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, isInt } from "class-validator";


export class Tournament {

    @ApiProperty({
        description: 'Идентификатор турнира',
        example: 1
    })
    @IsInt()
    @Type(() => Number)
    id: number

    @ApiProperty({
        description: 'Статус турнира',
        example: 1
    })
    @IsInt()
    @Type(() => Number)
    status_id: number

    @ApiProperty({
        description: 'Список пользователей турнира',
        example: 1,
        isArray: true
    })
    @IsArray()
    @IsInt({ each: true })
    @Type(() => Number)
    @Transform(property => Array.isArray(property.value) ? property.value : [property.value])
    playerIds: number[]

    @ApiProperty({
        description: 'Победитель турнира',
        example: 'Никита'
    })
    @IsOptional()
    @IsString()
    winner: string

    @ApiProperty({
        description: 'Количество участников турнира',
        example: 8
    })
    @IsInt()
    @Type(() => Number)
    participantsNumber: number
}