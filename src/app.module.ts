import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { User } from "./auth/models/user.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers: [AppController],
    providers: [AppService, AuthService],
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || "5432"),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [User]
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "60s" }
        }),
        AuthModule
    ]
})
export class AppModule {}
