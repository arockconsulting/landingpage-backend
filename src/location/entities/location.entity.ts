import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * Represents a location entity, storing address and geographical coordinates.
 */
@Entity()
export class Location {
  /**
   * The unique identifier for the location.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The street address of the location.
   * @minLength 5
   * @maxLength 255
   */
  @Column({ length: 255 })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  address: string;

  /**
   * The latitude of the location.
   */
  @Column({ type: 'decimal', precision: 10, scale: 7 })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  /**
   * The longitude of the location.
   */
  @Column({ type: 'decimal', precision: 10, scale: 7 })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  /**
   * An optional description or name for the location.
   * @maxLength 255
   */
  @Column({ length: 255, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;
}