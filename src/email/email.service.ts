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
import { regresarModeradorMailOptions } from './emailOptions/regrsarMailOptions';
import { PendienteDto } from './dto/pendiente.dto';
import { pendienteMailOptions } from './emailOptions/pendienteMailOptions';
import { Attachment } from 'nodemailer/lib/mailer';
interface EmailData {
    details: string;
    Id: string;
    destinatario: string;
    emails_extra?: string[];
    attachments?: Attachment[];
}

import { regresarResolutorMailOptions } from './emailOptions/regrsarResolutorMailOptions';
import { Correo } from 'src/schemas/correo.schema';
import { regresarMesaMailOptions } from './emailOptions/regrsarMailaMesaOptions';
@Injectable()
export class EmailService {
    constructor(
        private readonly mailerService: MailerService,
    ) { }
    async asignarEmail(message: any) {
        const exito = `✅ Ticket ${message.Id} asignado: correo enviado al usuario ${message.destinatario}`;
        const fallo = `❌ Falló la asignación ticket ${message.Id} : ✅ error enviado correo al usuario ${message.destinatario}`
        try {
            const enviado = await this.mailerService.sendMail(asignarMailOptions(message));
            if (enviado) { console.log(exito); } //Else guardar el mensaje en la colleccion de correos
        } catch (error) {
            console.error(fallo, error.message);
            throw error;
        }
    }

    async reasignarEmail(message: any) {
        try {
            await this.mailerService.sendMail(reasignarMailOptions(message));
            console.log(`Reasignar: ✅ correo enviado a ${message.destinatario}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async cerrarEmail(message: any) {
        try {
            await this.mailerService.sendMail(cerrarMailOptions(message));
            console.log(`Cerrar: ✅ correo enviado a ${message.destinatario}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async contactoEmail(message: any) {
        try {

            await this.mailerService.sendMail(contactoMailOptions(message));
            console.log(`Contacto cliente: ✅ correo enviado a ${message.destinatario}`);
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async crearEmail(message: any) {
        try {
            await this.mailerService.sendMail(crearticketMailOptions(message));
            console.log(`Creación de ticket ${message.Id}: ✅ correo enviado a ${message.destinatario}`);
            if (message.emails_extra !== "standby@standby.com" && message.emails_extra.length > 0) {
                let mssg = {
                    destinatario: message.emails_extra,
                    Id: message.Id,
                    details: message.details,
                    nombre: message.nombre,
                    telefono: message.telefono,
                    extension: message.extension,
                    ubicacion: message.ubicacion,
                    area: message.area,
                }
                console.log("Asignaciòn", mssg);
                await this.mailerService.sendMail(asignarMailOptions(mssg));
                console.log(`Asignación de ticket ${message.Id}: ✅ correo enviado a ${mssg.destinatario}`);
            }
            return true;
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error.message);
            throw error;
        }
    }

    async crearUsuarioEmail(message: any) {
        const exito = `✅ Usuario ${message.username} creado: correo enviado al usuario ${message.destinatario}`;
        const fallo = `❌ Falló el envió de credenciales del usuario ${message.username}: error enviado correo al usuario ${message.destinatario}`
        try {
            const envio = await this.mailerService.sendMail(crearUsuarioMailOptions(message));
            if (envio) { console.log(exito); }
        } catch (error) {
            console.error(fallo, error.message);
            throw error;
        }
    }

    async notaEmail(message: any) {
        try {
            await this.mailerService.sendMail(notaMailOptions(message));
            console.log(`Nota: ✅ Correo enviado para la nota en ticket #${message.Id}.`);
        } catch (error) {
            console.error(`❌ Error enviando correo con nota para el número de ticket #${message.Id}:`, error.message);
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
            await enviarCorreo(reasignarMailOptionsClients(message), `Cliente (ticket #${message.Id})`);
            await enviarCorreo(reasignarMailOptionsUser(message), `Resolutor (ticket #${message.Id})`);

        } catch (error) {
            console.error(`❌ Error enviando correo con nota para el número de ticket #${message.Id}:`, error.message);
            throw error;
        }
    }

    async regresarModeradorEmail(message: any) {
        const exito = `✅ Ticket #${message.Id} devuelto a Moderador: Correo enviado.`;
        const fallo = `❌ Falló la devolución del ticket ${message.Id} : error enviado correo a Moderador.`
        try {
            const envio = await this.mailerService.sendMail(regresarModeradorMailOptions(message));
            if (envio) { console.log(exito); }
        } catch (error) {
            console.error(fallo, error.message);
            throw error;
        }
    }

    async regresarEmailResolutor(message: any) {
        try {
            await this.mailerService.sendMail(regresarResolutorMailOptions(message));
            console.log(`Regresar ticket a resolutor: ✅ Correo enviado para el número de ticket #${message.Id}.`);
        } catch (error) {
            console.error(`❌ Error enviando correo para el número de ticket #${message.Id}:`, error.message);
            throw error;
        }
    }

    async regresarEmailMesa(message: any) {
        const exito = `✅ Ticket #${message.Id}devuelto a Mesa: Correo enviado a Mesa. `;
        const fallo = `❌ Falló la devolución del ticket ${message.Id} : error enviado correo a Mesa.`
        try {
            const envio = await this.mailerService.sendMail(regresarMesaMailOptions(message));
            if (envio) { console.log(exito); }
        } catch (error) {
            console.error(fallo, error.message);
            throw error;
        }
    }
    async marcarPendiente(dto: any, files: Express.Multer.File[]) {
        try {
            const parsed = JSON.parse(dto.correoData);

            const data: EmailData = {
                Id: parsed.Id,
                destinatario: parsed.destinatario,
                emails_extra: parsed.emails_extra,
                details: parsed.details,
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
            const correo = await this.mailerService.sendMail(pendienteMailOptions(data));
            if (correo) {
                console.log(`Contacto: ✅ Correo enviado para el número de ticket #${data.Id}. Cliente: ${data.destinatario}. Extras: ${data.emails_extra}`);
                return {
                    success: true,
                    message: "Correo enviado correctamente",
                };
            }
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
                Id: parsed.Id,
                destinatario: parsed.destinatario,
                emails_extra: parsed.emails_extra,
                attachments: []
            };
            console.log(data);
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

            const correo = await this.mailerService.sendMail(contactoMailOptions(data));
            if (correo) {
                console.log(`Contacto: ✅ Correo enviado para el número de ticket #${data.Id}. Cliente: ${data.destinatario}. Extras: ${data.emails_extra}`);
                return {
                    success: true,
                    message: "Correo enviado correctamente",
                };
            }
        } catch (error) {
            console.error("Error al enviar correo:", error);
            return {
                success: false,
                message: "Error al enviar el correo",
                error: error.message || error,
            };
        }
    }

    async cerrarTicket(dto: any, files: Express.Multer.File[]) {
        const parsed = JSON.parse(dto.correoData);

        const data: EmailData = {
            details: parsed.details,
            Id: parsed.Id,
            destinatario: parsed.destinatario,
            attachments: []
        };
        try {

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
            await this.mailerService.sendMail(cerrarMailOptions(data));

            console.log(`Cerrar: ✅ Correo enviado para el número de ticket #${data.Id}.`);
            return {
                success: true,
                message: `Ticket ${data.Id} guardado correctamente.`,
            };
        } catch (error) {
            console.error(`❌ Error enviando correo para el número de ticket: #${data.Id}`, error.message);
            return {
                success: false,
                message: "Error al enviar el correo",
                error: error.message || error,
            };
        }
    }
}
