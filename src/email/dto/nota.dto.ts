import { Type } from 'class-transformer';
import {
    IsString,
    IsArray,
    IsOptional,
    IsMongoId,
    IsNotEmpty,
    ValidateNested,
} from 'class-validator';

export class CerrarDto {
    @IsString()
    Nota: string;

    @IsString()
    idTicket: string;

    @IsString()
    @IsOptional()
    destinatario1: string;
   
    @IsString()
    @IsOptional()
    destinatario2: string;
   
    @IsString()
    @IsOptional()
    destinatario3: string;
}
