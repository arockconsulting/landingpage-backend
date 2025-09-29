import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

/**
 * Controller for handling product related requests.
 */
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Creates a new product.
   * @param createProductDto The data for creating the product.
   * @returns The created product.
   */
  @Post()
  async create(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  /**
   * Retrieves all products.
   * @returns A list of all products.
   */
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  /**
   * Retrieves a product by its ID.
   * @param id The ID of the product to retrieve.
   * @returns The product with the given ID.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  /**
   * Updates a product by its ID.
   * @param id The ID of the product to update.
   * @param updateProductDto The data for updating the product.
   * @returns The updated product.
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  /**
   * Deletes a product by its ID.
   * @param id The ID of the product to delete.
   * @returns A success message.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productService.remove(id);
  }
}