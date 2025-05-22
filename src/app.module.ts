import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { RedisController } from './redis/redis.controller';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [EmailModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  }), RedisModule,],
  controllers: [AppController, RedisController],
  providers: [AppService],
})
export class AppModule { }
