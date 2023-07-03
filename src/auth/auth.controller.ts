import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpUserDto, SignInUserDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    async signUp(@Body() signUpUserDto: SignUpUserDto) {
        const { name, email } = await this.authService.signUp(signUpUserDto);
        return { name, email };
    }

    @Post("signin")
    async signIn(@Body() signInUserDto: SignInUserDto) {
        const accessToken = await this.authService.signIn(signInUserDto);
        return { accessToken };
    }
}
