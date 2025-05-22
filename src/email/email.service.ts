import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import { reasignarMailOptions } from './emailOptions/reasignarMailOptions';
import { asignarMailOptions } from './emailOptions/asignarMailOptions';
import { cerrarMailOptions } from './emailOptions/cerrarMailOptions';
import { contactoMailOptions } from './emailOptions/contactoMailOptions';
import { crearticketMailOptions } from './emailOptions/crearticketMailOptions';
import { crearUsuarioMailOptions } from './emailOptions/crearUsuarioMailOptions';
import { notaMailOptions } from './emailOptions/notaMailOptions';
import { reasignarMailOptionsClients, reasignarMailOptionsUser } from './emailOptions/reabrirMailOptions';
import { regresarMailOptions } from './emailOptions/regrsarMailOptions';
@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) { }
    async asignarEmail(data: any) {
        try {
            await this.mailerService.sendMail(asignarMailOptions(data));
            console.log(`Asignar: ✅ correo enviado a ${data.correoUsuario}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async reasignarEmail(data: any) {
        try {
            await this.mailerService.sendMail(reasignarMailOptions(data));
            console.log(`Reasignar: ✅ correo enviado a ${data.correoUsuario}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async cerrarEmail(data: any) {
        try {
            await this.mailerService.sendMail(cerrarMailOptions(data));
            console.log(`Cerrar: ✅ correo enviado a ${data.correoUsuario}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async contactoEmail(data: any) {
        try {

            await this.mailerService.sendMail(contactoMailOptions(data));
            console.log(`Cerrar: ✅ correo enviado a ${data.correoCliente}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async crearEmail(data: any) {
        try {
            await this.mailerService.sendMail(crearticketMailOptions(data));
            console.log(`Cerrar: ✅ correo enviado a ${data.correoCliente}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async crearUsuarioEmail(data: any) {
        try {
            await this.mailerService.sendMail(crearUsuarioMailOptions(data));
            console.log(`✅ Correo enviado para el Usuario#${data.username}.`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async notaEmail(data: any) {
        try {
            await this.mailerService.sendMail(notaMailOptions(data));
            console.log(`✅ Correo enviado para el nota en el numero de ticket #${data.idTicket}. Respuesta:`);
        } catch (error) {
            console.error(`❌ Error enviando correo con nota para el numero de ticket #${data.idTicket}:`, error.message);
            throw error;
        }
    }

    async reabrirEmail(data: any) {
        try {
            const enviarCorreo = async (options: any, descripcion: string) => {
                try {
                    await this.mailerService.sendMail(options);
                    console.log(`✅ Correo enviado correctamente: ${descripcion}`);
                } catch (error) {
                    console.error(`❌ Error enviando correo (${descripcion}): ${error.message}`);
                    throw new Error(`Error al enviar correo: ${descripcion}`);
                }
            };
            await enviarCorreo(reasignarMailOptionsClients(data), `Cliente (ticket #${data.idTicket})`);
            await enviarCorreo(reasignarMailOptionsUser(data), `Resolutor (ticket #${data.idTicket})`);

        } catch (error) {
            console.error(`❌ Error enviando correo con nota para el numero de ticket #${data.idTicket}:`, error.message);
            throw error;
        }
    }

    async regresarEmail(data: any) {
        try {
            await this.mailerService.sendMail(regresarMailOptions(data));
            console.log(`✅ Correo enviado para el numero de ticket #${data.idTicket}.`);
        } catch (error) {
            console.error(`❌ Error enviando correo para el numero de ticket #${data.idTicket}:`, error.message);
            throw error;
        }
    }
}
