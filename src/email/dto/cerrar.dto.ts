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


export class CerrarDto {
    @IsString()
    Nota: string;

    @IsString()
    Id: number;

    @IsString()
    destinatario: string;

    @ValidateNested({ each: true })
    @Type(() => FileDto)
    @IsOptional()
    Files?: FileDto[];
}
