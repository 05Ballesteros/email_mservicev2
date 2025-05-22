// dto/publish.dto.ts
import {
  IsNotEmpty,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MessageDto } from './message.dto';
import { REDIS_CHANNELS } from '../constants/redis_Channels';

export class PublishDto {
  @IsNotEmpty()
  // Validamos que el valor recibo sea uno de los valores de REDIS_CHANNELS
  @IsEnum(REDIS_CHANNELS, { message: 'Canal inválido' })
  channel: typeof REDIS_CHANNELS[keyof typeof REDIS_CHANNELS];

  @ValidateNested()
  @Type(() => MessageDto)
  message: MessageDto;
}
