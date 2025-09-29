```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from './entities/pizza.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PizzaService {
  private pizzas: Pizza[] = [];

  /**
   * Creates a new pizza.
   * @param createPizzaDto The data for creating the pizza.
   * @returns The newly created pizza.
   */
  create(createPizzaDto: CreatePizzaDto): Pizza {
    const pizza: Pizza = {
      id: uuidv4(),
      ...createPizzaDto,
    };
    this.pizzas.push(pizza);
    return pizza;
  }

  /**
   * Retrieves all pizzas.
   * @returns An array of all pizzas.
   */
  findAll(): Pizza[] {
    return this.pizzas;
  }

  /**
   * Retrieves a pizza by its ID.
   * @param id The ID of the pizza to retrieve.
   * @returns The pizza with the given ID, or null if not found.
   * @throws {NotFoundException} If no pizza with the given ID is found.
   */
  findOne(id: string): Pizza {
    const pizza = this.pizzas.find((pizza) => pizza.id === id);
    if (!pizza) {
      throw new NotFoundException(`Pizza with ID "${id}" not found`);
    }
    return pizza;
  }

  /**
   * Updates a pizza by its ID.
   * @param id The ID of the pizza to update.
   * @param updatePizzaDto The data to update the pizza with.
   * @returns The updated pizza.
   * @throws {NotFoundException} If no pizza with the given ID is found.
   */
  update(id: string, updatePizzaDto: UpdatePizzaDto): Pizza {
    const pizzaIndex = this.pizzas.findIndex((pizza) => pizza.id === id);

    if (pizzaIndex === -1) {
      throw new NotFoundException(`Pizza with ID "${id}" not found`);
    }

    this.pizzas[pizzaIndex] = { ...this.pizzas[pizzaIndex], ...updatePizzaDto };

    return this.pizzas[pizzaIndex];
  }

  /**
   * Removes a pizza by its ID.
   * @param id The ID of the pizza to remove.
   * @throws {NotFoundException} If no pizza with the given ID is found.
   */
  remove(id: string): void {
    const pizzaIndex = this.pizzas.findIndex((pizza) => pizza.id === id);

    if (pizzaIndex === -1) {
      throw new NotFoundException(`Pizza with ID "${id}" not found`);
    }

    this.pizzas.splice(pizzaIndex, 1);
  }
}
```
```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Controller('pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  /**
   * Creates a new pizza.
   * @param createPizzaDto The data for creating the pizza.
   * @returns The newly created pizza.
   */
  @Post()
  create(@Body() createPizzaDto: CreatePizzaDto) {
    return this.pizzaService.create(createPizzaDto);
  }

  /**
   * Retrieves all pizzas.
   * @returns An array of all pizzas.
   */
  @Get()
  findAll() {
    return this.pizzaService.findAll();
  }

  /**
   * Retrieves a pizza by its ID.
   * @param id The ID of the pizza to retrieve.
   * @returns The pizza with the given ID.
   */
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.pizzaService.findOne(id);
  }

  /**
   * Updates a pizza by its ID.
   * @param id The ID of the pizza to update.
   * @param updatePizzaDto The data to update the pizza with.
   * @returns The updated pizza.
   */
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ) {
    return this.pizzaService.update(id, updatePizzaDto);
  }

  /**
   * Removes a pizza by its ID.
   * @param id The ID of the pizza to remove.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.pizzaService.remove(id);
  }
}
```
```typescript
import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreatePizzaDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  price: number;

  @IsString()
  imageUrl: string;
}
```
```typescript
import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class UpdatePizzaDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  price?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
```
```typescript
export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
```