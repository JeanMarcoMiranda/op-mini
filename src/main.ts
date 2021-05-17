import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: number = configService.get('PORT') || 3000;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Op-Mini')
    .setDescription('This is the documentation of the minimarket app')
    .setVersion('1.0')
    .build();

  const configDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, configDocument);

  await app.listen(port);
}
bootstrap();
