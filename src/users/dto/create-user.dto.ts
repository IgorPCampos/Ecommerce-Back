import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../../utility/enums/role.enum";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minSymbols: 0,
        minUppercase: 0
    })
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role: number;
}
