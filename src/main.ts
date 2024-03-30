import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ transform: true }))
	app.enableCors()
	
	const swaggerConfig = new DocumentBuilder()
		.setTitle('MatchKeeper')
		.setDescription('MatchKeeper')
		.setVersion('1.0')
		.addTag('auth')
		.addTag('users')
		.addTag('tournaments')
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('api', app, document)

	await app.listen(3000);
}
bootstrap();
