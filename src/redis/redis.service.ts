import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CHANNELS } from './constants/redis_Channels';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class RedisService implements OnModuleInit {
  private redisClient: Redis;
  private subscriber: Redis;

  constructor(private readonly emailService: EmailService) { // Inyección de dependencia
    const redisOptions = {
      host: 'redis', // El nombre del servicio en Docker Compose
      port: 6379,    // Puerto expuesto por el contenedor
    };

    this.redisClient = new Redis(redisOptions);
    this.subscriber = new Redis(redisOptions);
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
  private async handleMessage(channel: string, message: any) {
    switch (channel) {
      case REDIS_CHANNELS.ASIGNAR:
        await this.handleAsignar(message);
        break;
      case REDIS_CHANNELS.REASIGNAR:
        await this.handleReasignar(message);
        break;
      case REDIS_CHANNELS.CERRAR:
        await this.handleCerrar(message);
        break;
      case REDIS_CHANNELS.CONTACTO:
        await this.handleContacto(message);
        break;
      case REDIS_CHANNELS.CREAR_TICKET:
        await this.handleCrearTicket(message);
        break;
      case REDIS_CHANNELS.CREAR_USUARIO:
        await this.handleCrearUsuario(message);
        break;
      case REDIS_CHANNELS.NOTA:
        await this.handleNota(message);
        break;
      case REDIS_CHANNELS.REABRIR:
        await this.handleReabrir(message);
        break;
      case REDIS_CHANNELS.REGRESAR:
        await this.handleRegresar(message);
        break;
      default:
        console.warn(`No existe el canal: ${channel}`);
        break;
    }
  }

  private async handleCrearTicket(message: any) { await this.emailService.crearEmail(message); }
  private async handleAsignar(message: any) { await this.emailService.asignarEmail(message); }
  private async handleReasignar(message: any) { await this.emailService.reasignarEmail(message); }
  private async handleCerrar(message: any) { await this.emailService.cerrarEmail(message); }
  private async handleContacto(message: any) { await this.emailService.contactoEmail(message); }
  private async handleCrearUsuario(message: any) { await this.emailService.crearUsuarioEmail(message); }
  private async handleNota(message: any) { await this.emailService.notaEmail(message); }
  private async handleReabrir(message: any) { await this.emailService.reabrirEmail(message); }
  private async handleRegresar(message: any) { await this.emailService.regresarEmail(message); }

  // Publicar mensajes en un canal
  publish(channel: string, message: any) {
    console.log("message?", message);
    this.redisClient.publish(channel, JSON.stringify(message));
  }
}
