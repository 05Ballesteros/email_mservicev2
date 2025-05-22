import { Controller, Post, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('')
@UseGuards(JwtAuthGuard)
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    // @Post(/contactoCliente/:id)
    // contactoCliente(@Body() contactoClienteDto: ContactoClienteDto) {
    //     return this.emailService.contactoCliente(contactoClienteDto);
    // }

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
