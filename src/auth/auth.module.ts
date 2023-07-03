import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "./models/user.model";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    exports: [SequelizeModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
