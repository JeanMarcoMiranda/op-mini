import { ValidationPipe } from "@nestjs/common";
import { Callback, Handler, Context } from "aws-lambda";
import { Server } from 'http';
import serverlessExpress from '@vendia/serverless-express';

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

let server: Handler;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: ['error'] })
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: '*',
        allowedHeaders: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true
    });
    await app.init();
        
    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async(
    event: any,
    context: Context,
    callback: Callback
    ) => {
    server = await bootstrap();
    return server(event, context, callback);
}