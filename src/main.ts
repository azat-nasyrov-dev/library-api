import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  // TODO: OPTIONALLY YOU CAN ADD A GLOBAL PREFIX
  /*
    app.setGlobalPrefix('api');
   */

  await app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
}

bootstrap();
