```typescript
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * Represents a product in the system.
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
   * @example "Pizza Margherita"
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The price of the product.
   * @example 12.99
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @Min(0.01)
  price: number;

  /**
   * The URL of the product's image.
   * @example "https://example.com/pizza.jpg"
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  image: string;

  /**
   * A description of the product.
   * @example "A classic pizza with tomato sauce, mozzarella, and basil."
   */
  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * The date and time when the product was created.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * The date and time when the product was last updated.
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
```