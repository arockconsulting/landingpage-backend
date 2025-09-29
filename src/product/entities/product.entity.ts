import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Product Entity
 * Represents a product in the pizzeria.
 */
@Entity()
export class Product {
  /**
   * The unique identifier for the product.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the product.
   * Must not be empty.
   */
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  /**
   * A description of the product.
   * Can be empty.
   */
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  description?: string;

  /**
   * The price of the product.
   * Must be a number greater than or equal to 0.
   */
  @IsNumber()
  @Min(0)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  /**
   * The URL of the product's image.
   * Can be empty.
   */
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  image?: string;
}