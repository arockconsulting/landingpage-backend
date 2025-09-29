import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

/**
 * Módulo para gerenciar informações de localização.
 */
@Module({
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}