// src/dto/message.dto.ts
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class MessageDto {
  @IsOptional() @IsEmail() correoUsuario?: string;
  @IsOptional() @IsEmail() correoCliente?: string;
  @IsOptional() @IsEmail() correoDestinatario?: string;
  @IsOptional() @IsEmail() correoResolutor?: string;
  @IsOptional() @IsString() idTicket?: string;
  @IsOptional() @IsString() descripcionTicket?: string;
  @IsOptional() @IsString() nombreCliente?: string;
  @IsOptional() @IsString() nombreUsuario?: string;
  @IsOptional() @IsString() username?: string;
  @IsOptional() @IsString() password?: string;
  @IsOptional() @IsString() telefonoCliente?: string;
  @IsOptional() @IsString() extensionCliente?: string;
  @IsOptional() @IsString() ubicacion?: string;
  @IsOptional() @IsString() area?: string;
  @IsOptional() @IsString() Descripcion_cierre?: string;
  @IsOptional() @IsString() cuerpo?: string;
  @IsOptional() @IsString() nota?: string;
  @IsOptional() @IsString() descripcionTicketRegresado?: string;
}
