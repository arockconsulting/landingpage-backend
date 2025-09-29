import { IsString, IsOptional, IsNumber, IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para atualizar uma localização existente.
 */
export class UpdateLocationDto {
  /**
   * Nome da localização (opcional).
   * @example "Casa"
   */
  @ApiProperty({ example: 'Casa', description: 'Nome da localização' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  /**
   * Latitude da localização (opcional).
   * @example -23.5505
   */
  @ApiProperty({ example: -23.5505, description: 'Latitude da localização' })
  @IsOptional()
  @IsNumber()
  @IsLatitude()
  latitude?: number;

  /**
   * Longitude da localização (opcional).
   * @example -46.6333
   */
  @ApiProperty({ example: -46.6333, description: 'Longitude da localização' })
  @IsOptional()
  @IsNumber()
  @IsLongitude()
  longitude?: number;
}