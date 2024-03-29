import { SetMetadata } from "@nestjs/common"


export const jwtConstants = { secret: process.env.SECRET }
export const IS_PUBLIC_KEY = () => SetMetadata(IS_PUBLIC_KEY, true)