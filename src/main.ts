import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
async function bootstrap() {
    
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
        credentials: true,
    });
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
    await app.listen(3333);
}
bootstrap();
