import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CHANNELS } from './constants/redis_Channels';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class RedisService implements OnModuleInit {
  private redisClient: Redis;
  private subscriber: Redis;

  constructor(private readonly emailService: EmailService) { // Inyección de dependencia
    this.redisClient = new Redis(); // Configura con tus credenciales si es necesario
    this.subscriber = new Redis();
  }

  async onModuleInit() {
    // Suscribirse a todos los canales
    const channelNames = Object.values(REDIS_CHANNELS);
    for (const channel of channelNames) {
      await this.subscriber.subscribe(channel, (err) => {
        if (err) {
          console.error(`❌Error al suscribirse al canal ${channel}:`, err.message);
        } else {
          console.log(`✅ Suscrito al canal ${channel}`);
        }
      });
    }

    // Escuchar mensajes de todos los canales
    this.subscriber.on('message', (channel, message) => {
      console.log(`Mensaje recibido en el canal ${channel}:`);
      this.handleMessage(channel, JSON.parse(message));
    });
  }

  // Manejar los mensajes de cada canal
  private async handleMessage(channel: string, data: any) {
    switch (channel) {
      case REDIS_CHANNELS.ASIGNAR:
        await this.handleAsignar(data);
        break;
      case REDIS_CHANNELS.REASIGNAR:
        await this.handleReasignar(data);
        break;
      case REDIS_CHANNELS.CERRAR:
        await this.handleCerrar(data);
        break;
      case REDIS_CHANNELS.CONTACTO:
        await this.handleContacto(data);
        break;
      case REDIS_CHANNELS.CREAR_TICKET:
        await this.handleCrearTicket(data);
        break;
      case REDIS_CHANNELS.CREAR_USUARIO:
        await this.handleCrearUsuario(data);
        break;
      case REDIS_CHANNELS.NOTA:
        await this.handleNota(data);
        break;
      case REDIS_CHANNELS.REABRIR:
        await this.handleReabrir(data);
        break;
      case REDIS_CHANNELS.REGRESAR:
        await this.handleRegresar(data);
        break;
      default:
        console.warn(`No existe el canal: ${channel}`);
        break;
    }
  }

  private async handleCrearTicket(data: any) { await this.emailService.crearEmail(data); }
  private async handleAsignar(data: any) { await this.emailService.asignarEmail(data); }
  private async handleReasignar(data: any) { await this.emailService.reasignarEmail(data); }
  private async handleCerrar(data: any) { await this.emailService.cerrarEmail(data); }
  private async handleContacto(data: any) { await this.emailService.contactoEmail(data); }
  private async handleCrearUsuario(data: any) { await this.emailService.crearUsuarioEmail(data); }
  private async handleNota(data: any) { await this.emailService.notaEmail(data); }
  private async handleReabrir(data: any) { await this.emailService.reabrirEmail(data); }
  private async handleRegresar(data: any) { await this.emailService.regresarEmail(data); }

  // Publicar mensajes en un canal
  publish(channel: string, message: any) {
    this.redisClient.publish(channel, JSON.stringify(message));
  }
}
