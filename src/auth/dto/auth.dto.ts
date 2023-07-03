import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class SignInUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
