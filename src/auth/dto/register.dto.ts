import { ApiProperty, PickType } from "@nestjs/swagger";
import { LoginDto } from "./login.dto";
import { IsNumber, IsPositive } from "class-validator";
import { Type } from "class-transformer";


export class RegisterDto extends PickType(LoginDto, ['nickname', 'password'] as const) {}
