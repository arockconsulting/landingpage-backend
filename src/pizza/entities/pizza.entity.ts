```typescript
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Represents a Pizza entity.
 */
@Entity()
export class Pizza {
  /**
   * The unique identifier for the pizza.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the pizza.
   * @example "Margherita"
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The URL of the pizza image.
   * @example "https://example.com/margherita.jpg"
   */
  @Column()
  @IsString()
  @IsOptional()
  image_url: string;

  /**
   * The price of the pizza.
   * Must be a positive number.
   * @example 12.99
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @Min(0.01)
  price: number;
}
```