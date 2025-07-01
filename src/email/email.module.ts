import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Host SMTP de Gmail
        port: 587,              // Puerto SMTP (587 para STARTTLS)
        secure: false,          // false para STARTTLS (true solo si usas puerto 465)
        auth: {
          user: 'carlos.ballesteros@ipejal.gob.mx',       // Tu correo de Gmail
          pass: 'udls uiyz rrit khiv', // Contraseña o contraseña de aplicación
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
  controllers: [EmailController],
})
export class EmailModule { }
