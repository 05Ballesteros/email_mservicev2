import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.office365.com', // Host para Outlook
        port: 587,                 // Puerto SMTP para STARTTLS
        secure: false,             // false para STARTTLS
        auth: {
          user: 'carlos.ballesteros@ipejal.gob.mx', // Tu correo de Outlook
          pass: 'Moazeth8',         // Contraseña de tu cuenta o contraseña de aplicación
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule { }
