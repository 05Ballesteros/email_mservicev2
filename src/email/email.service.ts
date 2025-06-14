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
import { PendienteDto } from './dto/pendiente.dto';
import { pendienteMailOptions } from './emailOptions/pendienteMailOptions';
import { Attachment } from 'nodemailer/lib/mailer';
interface EmailData {
    details: string;
    idTicket: string;
    destinatario: string;
    emails_extra: string[];
    attachments: Attachment[];
}

import { regresarResolutorMailOptions } from './emailOptions/regrsarResolutorMailOptions';
@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) { }
    async asignarEmail(message: any) {
        try {
            await this.mailerService.sendMail(asignarMailOptions(message));
            console.log(`Asignar: ✅ correo enviado a ${message.correoUsuario}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async reasignarEmail(message: any) {
        try {
            await this.mailerService.sendMail(reasignarMailOptions(message));
            console.log(`Reasignar: ✅ correo enviado a ${message.correoUsuario}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async cerrarEmail(message: any) {
        try {
            await this.mailerService.sendMail(cerrarMailOptions(message));
            console.log(`Cerrar: ✅ correo enviado a ${message.correoUsuario}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async contactoEmail(message: any) {
        try {

            await this.mailerService.sendMail(contactoMailOptions(message));
            console.log(`Contacto cliente: ✅ correo enviado a ${message.correoCliente}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async crearEmail(message: any) {
        try {
            await this.mailerService.sendMail(crearticketMailOptions(message));
            console.log(`Creación de ticket: ✅ correo enviado a ${message.correoCliente}`);
            if (message.Asignado_a !== "") {
                await this.mailerService.sendMail(asignarMailOptions(message));
                console.log(`Asignación de ticket: ✅ correo enviado a ${message.correoUsuario}`);
            }
            return true;
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async crearUsuarioEmail(message: any) {
        try {
            await this.mailerService.sendMail(crearUsuarioMailOptions(message));
            console.log(`Creación de usuario: ✅ Correo enviado para el Usuario#${message.username}.`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async notaEmail(message: any) {
        try {
            await this.mailerService.sendMail(notaMailOptions(message));
            console.log(`Nota: ✅ Correo enviado para la nota en ticket #${message.idTicket}.`);
        } catch (error) {
            console.error(`❌ Error enviando correo con nota para el número de ticket #${message.idTicket}:`, error.message);
            throw error;
        }
    }

    async reabrirEmail(message: any) {
        try {
            const enviarCorreo = async (options: any, descripcion: string) => {
                try {
                    await this.mailerService.sendMail(options);
                    console.log(`Reabrir: ✅ Correo enviado correctamente`);
                } catch (error) {
                    console.error(`❌ Error enviando correo: ${error.message}`);
                    throw new Error(`Error al enviar correo`);
                }
            };
            await enviarCorreo(reasignarMailOptionsClients(message), `Cliente (ticket #${message.idTicket})`);
            await enviarCorreo(reasignarMailOptionsUser(message), `Resolutor (ticket #${message.idTicket})`);

        } catch (error) {
            console.error(`❌ Error enviando correo con nota para el número de ticket #${message.idTicket}:`, error.message);
            throw error;
        }
    }

    async regresarEmail(message: any) {
        try {
            await this.mailerService.sendMail(regresarMailOptions(message));
            console.log(`Regresar: ✅ Correo enviado para el número de ticket #${message.idTicket}.`);
        } catch (error) {
            console.error(`❌ Error enviando correo para el número de ticket #${message.idTicket}:`, error.message);
            throw error;
        }
    }

    async regresarEmailResolutor(message: any) {
        try {
            await this.mailerService.sendMail(regresarResolutorMailOptions(message));
            console.log(`Regresar ticket a resolutor: ✅ Correo enviado para el número de ticket #${message.idTicket}.`);
        } catch (error) {
            console.error(`❌ Error enviando correo para el número de ticket #${message.idTicket}:`, error.message);
            throw error;
        }
    }

    async marcarPendiente(dto: any, files: Express.Multer.File[]) {
        try {
            const parsed = JSON.parse(dto.correoData);

            const data: EmailData = {
                details: parsed.details,
                idTicket: parsed.idTicket,
                destinatario: parsed.destinatario,
                emails_extra: [],
                attachments: []
            };

            if (parsed.emails_extra && Array.isArray(parsed.emails_extra)) {
                data.emails_extra = parsed.emails_extra;
            }

            if (files.length > 0) {
                const attachments = files.map(file => ({
                    filename: file.originalname,
                    content: file.buffer,
                    contentType: file.mimetype,
                    encoding: 'base64',
                }));
                data.attachments = attachments
            }

            await this.mailerService.sendMail(pendienteMailOptions(data));

            return {
                success: true,
                message: "Correo enviado correctamente",
            };
        } catch (error) {
            console.error("Error al enviar correo:", error);
            return {
                success: false,
                message: "Error al enviar el correo",
                error: error.message || error,
            };
        }
    }

    async contactoCliente(dto: any, files: Express.Multer.File[]) {
        try {
            const parsed = JSON.parse(dto.correoData);

            const data: EmailData = {
                details: parsed.details,
                idTicket: parsed.idTicket,
                destinatario: parsed.destinatario,
                emails_extra: [],
                attachments: []
            };

            if (parsed.emails_extra && Array.isArray(parsed.emails_extra)) {
                data.emails_extra = parsed.emails_extra;
            }

            if (files.length > 0) {
                const attachments = files.map(file => ({
                    filename: file.originalname,
                    content: file.buffer,
                    contentType: file.mimetype,
                    encoding: 'base64',
                }));
                data.attachments = attachments
            }

            await this.mailerService.sendMail(pendienteMailOptions(data));

            return {
                success: true,
                message: "Correo enviado correctamente",
            };
        } catch (error) {
            console.error("Error al enviar correo:", error);
            return {
                success: false,
                message: "Error al enviar el correo",
                error: error.message || error,
            };
        }
    }
}
