import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private nextId = 1;

  /**
   * Creates a new product.
   * @param createProductDto Data for creating the product.
   * @returns The created product.
   */
  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: this.nextId++,
      ...createProductDto,
    };
    this.products.push(product);
    return product;
  }

  /**
   * Retrieves all products.
   * @returns A list of all products.
   */
  findAll(): Product[] {
    return this.products;
  }

  /**
   * Retrieves a product by its ID.
   * @param id The ID of the product to retrieve.
   * @returns The product with the given ID, or undefined if not found.
   */
  findOne(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  /**
   * Updates a product.
   * @param id The ID of the product to update.
   * @param updateProductDto Data for updating the product.
   * @returns The updated product, or undefined if not found.
   */
  update(id: number, updateProductDto: UpdateProductDto): Product | undefined {
    const productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return undefined;
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
      id, // Ensure ID remains the same
    };

    return this.products[productIndex];
  }

  /**
   * Removes a product.
   * @param id The ID of the product to remove.
   * @returns True if the product was removed, false otherwise.
   */
  remove(id: number): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== id);
    return this.products.length < initialLength;
  }
}