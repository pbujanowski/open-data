import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('National Bank API')
    .setDescription('API documentation for the National Bank service')
    .setVersion('1.0')
    .addTag('gold-prices')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3001',
    methods: 'GET,',
  });

  await app.listen(process.env.PORT ?? 5001);
}

bootstrap().catch((error) => {
  console.error('Error during application start', error);
});
