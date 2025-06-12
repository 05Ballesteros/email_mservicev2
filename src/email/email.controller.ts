import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { PendienteDto } from './dto/pendiente.dto';
import { memoryStorage } from 'multer';
@Controller('email')
@UseGuards(JwtAuthGuard)
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Post("/pendiente/:id")
    @UseInterceptors(AnyFilesInterceptor({
        storage: memoryStorage(),
    }))
    async marcarPendiente(@Body() dto: PendienteDto, @UploadedFiles() files: Express.Multer.File[]) {
        return this.emailService.marcarPendiente(dto, files);
    }

    @Post("/contactoCliente/:id")
    @UseInterceptors(AnyFilesInterceptor({
        storage: memoryStorage(),
    }))
    async contactoCliente(@Body() dto: PendienteDto, @UploadedFiles() files: Express.Multer.File[]) {
        return this.emailService.contactoCliente(dto, files);
    }

    // @Get()
    // @Roles('Root', 'Administrador')
    // async findAll() {
    //     return await this.clientesService.findAll();
    // }

    // @Put(':id')
    // @Roles('Root', 'Administrador')
    // update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    //     return this.clientesService.update(id, updateClienteDto);
    // }

    // @Get('selectData')
    // @Roles('Root', 'Administrador')
    // async obtenerSelectData() {
    //     try {
    //         const result = await this.clientesService.obtenerSelectData();

    //         if (!result) {
    //             throw new HttpException('No se encontraron datos para SelectData', HttpStatus.NOT_FOUND);
    //         }
    //         return result;
    //     } catch (error) {
    //         console.error('Error en obtenerSelectData:', error.message);
    //         throw new HttpException(
    //             error.message || 'Error interno del servidor',
    //             error.status || HttpStatus.INTERNAL_SERVER_ERROR,
    //         );
    //     }
    // }

    // @Get(':Correo')
    // @Roles('Root', 'Administrador')
    // findByCorreo(@Param('Correo') Correo: string) {
    //     return this.clientesService.finByCorreo(Correo);
    // }

}
