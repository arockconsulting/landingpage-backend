```typescript
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

/**
 * Migration responsável por criar a tabela de produtos.
 */
export class CreateProduct1678886400000 implements MigrationInterface {
  /**
   * Executa a migration, criando a tabela de produtos com os campos:
   * - id: UUID único e auto-gerado.
   * - name: Nome do produto (string).
   * - price: Preço do produto (decimal).
   * - image: URL da imagem do produto (string).
   * - description: Descrição do produto (string).
   * - createdAt: Data de criação do produto (timestamp).
   * - updatedAt: Data da última atualização do produto (timestamp).
   *
   * @param queryRunner QueryRunner para executar as queries.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'image',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  /**
   * Reverte a migration, removendo a tabela de produtos.
   *
   * @param queryRunner QueryRunner para executar as queries.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
```
```typescript
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsPositive,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Entidade que representa um produto.
 */
@Entity({ name: 'products' })
export class Product {
  /**
   * Identificador único do produto.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Nome do produto.
   * @example "Pizza de Calabresa"
   */
  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  /**
   * Preço do produto.
   * @example 39.90
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @IsNotEmpty({ message: 'O preço é obrigatório' })
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @IsPositive({ message: 'O preço deve ser positivo' })
  price: number;

  /**
   * URL da imagem do produto.
   * @example "https://example.com/pizza.jpg"
   */
  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty({ message: 'A imagem é obrigatória' })
  @IsString({ message: 'A imagem deve ser uma string' })
  @MaxLength(255, { message: 'A imagem deve ter no máximo 255 caracteres' })
  image: string;

  /**
   * Descrição do produto.
   * @example "Deliciosa pizza de calabresa com borda recheada."
   */
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  description?: string;

  /**
   * Data de criação do produto.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Data da última atualização do produto.
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
```
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

/**
 * Módulo responsável pela gestão de produtos.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // Exporta o serviço para ser usado em outros módulos
})
export class ProductsModule {}
```
```typescript
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

/**
 * Controlador responsável pelas rotas de produtos.
 */
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Cria um novo produto.
   * @param createProductDto Dados do produto a ser criado.
   * @returns O produto criado.
   */
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  /**
   * Lista todos os produtos.
   * @returns Uma lista de produtos.
   */
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  /**
   * Busca um produto pelo seu ID.
   * @param id ID do produto a ser buscado.
   * @returns O produto encontrado.
   */
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  /**
   * Atualiza um produto existente.
   * @param id ID do produto a ser atualizado.
   * @param updateProductDto Dados do produto a serem atualizados.
   * @returns O produto atualizado.
   */
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  /**
   * Remove um produto.
   * @param id ID do produto a ser removido.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.productsService.remove(id);
  }
}
```
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';