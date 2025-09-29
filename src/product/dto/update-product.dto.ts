import { IsString, IsNumber, IsOptional, IsPositive, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object (DTO) for updating a product.
 * Defines the structure and validation rules for the request body when updating a product.
 */
export class UpdateProductDto {
  /**
   * The name of the product.
   * @example "Pizza Margherita"
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  /**
   * The description of the product.
   * @example "Classic pizza with tomato sauce, mozzarella and basil."
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  /**
   * The price of the product.
   * Should be a positive number.
   * @example 12.99
   */
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price?: number;

  /**
   * The URL of the product's image.
   * @example "https://example.com/margherita.jpg"
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  imageUrl?: string;
}