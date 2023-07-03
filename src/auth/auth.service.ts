import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { SignInUserDto, SignUpUserDto } from "./dto/auth.dto";
import { User } from "./models/user.model";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private jwtService: JwtService
    ) {}

    async signUp(credentials: SignUpUserDto) {
        const { email } = credentials;
        const existingUser = await this.userModel.findOne({ where: { email } });

        if (!existingUser) {
            const saltOrRounds = 10;
            const { password } = credentials;
            const hashedPassword = await bcrypt.hash(password, saltOrRounds);
            const createdUser = await this.userModel.create({
                ...credentials,
                password: hashedPassword
            } as Partial<User>);
            return createdUser;
        } else {
            throw new HttpException(
                "The user with entered email is already exist.",
                HttpStatus.CONFLICT
            );
        }
    }

    async signIn(credentials: SignInUserDto) {
        const { email, password: enteredPassword } = credentials;
        const existingUser = await this.userModel.findOne({ where: { email } });

        if (!existingUser) {
            throw new HttpException(
                "The user was not found.",
                HttpStatus.NOT_FOUND
            );
        }

        const { password } = existingUser;
        const isPasswordCorrect = await bcrypt.compare(
            enteredPassword,
            password
        );

        if (!isPasswordCorrect) {
            throw new HttpException(
                "The entered password is incorrect.",
                HttpStatus.UNAUTHORIZED
            );
        }

        const { id } = existingUser;
        const accessToken = await this.jwtService.signAsync({ sub: id, email });

        return accessToken;
    }
}
