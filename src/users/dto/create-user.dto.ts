import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../../utility/enums/role.enum";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 0,
        minSymbols: 0
    })
    password: string;
    
    @IsEnum(Role)
    @IsOptional()
    role?: number;
}
