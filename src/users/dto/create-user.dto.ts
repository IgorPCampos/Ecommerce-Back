import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../../utility/enums/role.enum";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail({}, { message: "O email fornecido é inválido" })
    email: string;

    @IsStrongPassword(
        {
            minLength: 6,
            minUppercase: 0,
            minSymbols: 0
        },
        {
            message: "A senha deve ter pelo menos 6 caracteres e incluir letras maiúsculas e números"
        }
    )
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: number;
}
