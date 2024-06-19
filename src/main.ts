import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  // TODO: OPTIONALLY YOU CAN ADD A GLOBAL PREFIX
  /*
    app.setGlobalPrefix('api');
   */

  const options = new DocumentBuilder()
    .setTitle('Library-API')
    .setDescription('Library-API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Developed by Azat Nasyrov')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
}

bootstrap();
