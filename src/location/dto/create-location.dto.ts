import { IsString, IsNotEmpty, IsOptional, IsNumber, IsLatitude, IsLongitude, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) para criar uma nova localização.
 * Define a estrutura de dados esperada para requisições de criação de localizações.
 */
export class CreateLocationDto {
  /**
   * Nome da localização.
   * @example "Casa da Pizza"
   */
  @ApiProperty({ example: 'Casa da Pizza', description: 'Nome da localização' })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  /**
   * Endereço da localização.
   * @example "Rua das Pizzas, 123"
   */
  @ApiProperty({ example: 'Rua das Pizzas, 123', description: 'Endereço da localização' })
  @IsString({ message: 'O endereço deve ser uma string' })
  @IsNotEmpty({ message: 'O endereço não pode estar vazio' })
  @MaxLength(200, { message: 'O endereço deve ter no máximo 200 caracteres' })
  address: string;

  /**
   * Latitude da localização.
   * @example -23.5505
   */
  @ApiProperty({ example: -23.5505, description: 'Latitude da localização' })
  @IsNumber({}, { message: 'A latitude deve ser um número' })
  @IsLatitude({ message: 'A latitude deve ser uma latitude válida' })
  latitude: number;

  /**
   * Longitude da localização.
   * @example -46.6333
   */
  @ApiProperty({ example: -46.6333, description: 'Longitude da localização' })
  @IsNumber({}, { message: 'A longitude deve ser um número' })
  @IsLongitude({ message: 'A longitude deve ser uma longitude válida' })
  longitude: number;

  /**
   * Descrição opcional da localização.
   * @example "A melhor pizzaria da cidade!"
   */
  @ApiProperty({ example: 'A melhor pizzaria da cidade!', description: 'Descrição da localização', required: false })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  description?: string;
}