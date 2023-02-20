import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const yaml = await readFile('./doc/api.yaml', 'utf-8');

  SwaggerModule.setup('doc', app, parse(yaml));

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
