// src/tickets/schemas/ticket.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types, Document } from 'mongoose';

@Schema({ collection: 'Correos' }) // Nombre correcto de la colección
export class Correo extends Document {
  @Prop({ type: String, default: '' })
  destinatario: string;
  
  @Prop({ type: String, default: '' })
  idTicket: string;
  
  @Prop({ type: String, default: '' })
  descripcionTicket: string;
  
  @Prop({ type: String, default: '' })
  envio: string;

}

export type CorreoDocument = Correo & Document;
export const CorreoSchema = SchemaFactory.createForClass(Correo);

