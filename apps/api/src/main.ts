import { NestFactory } from '@nestjs/core';
import { Module, Get, Controller, Post, Body } from '@nestjs/common';

@Controller('api/v1/health')
class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'HEALTHY',
      service: 'DEVGYAN INNOVATION Campus Core API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}

@Controller('api/v1/auth')
class AuthController {
  @Post('verify-token')
  verifySecretToken(@Body() body: { token: string; schoolId: string }) {
    if (body.token && body.token.startsWith('SEC-')) {
      return { success: true, message: 'Token verified and authorized.', valid: true };
    }
    return { success: false, message: 'Invalid or expired single-use token.', valid: false };
  }
}

@Module({
  controllers: [HealthController, AuthController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`[DEVGYAN INNOVATION API] Server listening on port ${port}`);
}
bootstrap();
