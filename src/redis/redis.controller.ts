import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RedisService } from './redis.service';
import { REDIS_CHANNELS } from './constants/redis_Channels';
import { PublishDto } from './dto/publish.dto';
import { RolesGuard } from 'src/auth/jwt-roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('redis')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RedisController {
    constructor(private readonly redisService: RedisService) { }

    @Post('publish')
    async publishMessage(
        @Body() publishDto: PublishDto,
    ) {
        const { channel, message } = publishDto;
        console.log("Esto message llega", message);

        // Validar si el canal existe
        if (!Object.values(REDIS_CHANNELS).includes(channel)) {
            return { error: `Canal inválido: ${channel}` };
        }

        // Publicar el mensaje en el canal
        this.redisService.publish(channel, message);
        return { success: true, channel, message };
    }
}
