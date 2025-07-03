import { Type } from 'class-transformer';
import {
    IsString,
    IsArray,
    IsOptional,
    IsMongoId,
    IsNotEmpty,
    ValidateNested,
} from 'class-validator';

export class FileDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsMongoId()
    @IsNotEmpty()
    _id: string;
}


export class PendienteDto {
    @IsString()
    details: string;

    @IsString()
    Id: string;

    @IsString()
    destinatario: string;

    @IsArray()
    emails_extra: string[];

    @IsArray()
    attachments: string[];

    @ValidateNested({ each: true })
    @Type(() => FileDto)
    @IsOptional()
    Files?: FileDto[];
}
