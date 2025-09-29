import { IsString, IsNumber, IsOptional, IsPositive, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para criar um novo produto.
 */
export class CreateProductDto {
  /**
   * Nome do produto.
   * @example "Pizza Margherita"
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Descrição do produto.
   * @example "A clássica pizza italiana com molho de tomate, mussarela e manjericão."
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * Preço do produto.
   * @example 29.99
   */
  @IsNumber()
  @IsPositive()
  price: number;

  /**
   * URL da imagem do produto.
   * @example "https://example.com/pizza.jpg"
   */
  @IsString()
  @IsOptional()
  imageUrl?: string;

  /**
   * Categorias do produto.
   * @example ["pizza", "italiana"]
   */
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categories?: string[];
}