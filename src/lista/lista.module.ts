import { Module } from '@nestjs/common';
import { ListaController } from './lista.controller';
import { ListaService } from './lista.service';

@Module({
  controllers: [ListaController],
  providers: [ListaService]
})
export class ListaModule {}
