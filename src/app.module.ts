import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { RedisController } from './redis/redis.controller';
import { RedisModule } from './redis/redis.module';
import { EmailController } from './email/email.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './logs/logs.module';
import { ListaModule } from './lista/lista.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=${process.env.MONGODB_AUTHSOURCE}&directConnection=true`),
    EmailModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  }), RedisModule, LogsModule, ListaModule,],
  controllers: [AppController, RedisController, EmailController],
  providers: [AppService],
})
export class AppModule { }
