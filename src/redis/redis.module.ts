import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [],
  providers: [RedisService, EmailService],
  exports: [RedisService, EmailService],
  controllers: [RedisController],
})
export class RedisModule { }
