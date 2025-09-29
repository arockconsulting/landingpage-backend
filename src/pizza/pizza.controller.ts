```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { Pizza } from './entities/pizza.entity';

@ApiTags('pizzas')
@Controller('pizzas')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  /**
   * Creates a new pizza.
   * @param createPizzaDto The data for creating the pizza.
   * @returns The created pizza.
   * @throws {BadRequestException} If the input data is invalid.
   */
  @Post()
  @ApiCreatedResponse({ description: 'The pizza has been successfully created.', type: Pizza })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async create(
    @Body(new ValidationPipe()) createPizzaDto: CreatePizzaDto,
  ): Promise<Pizza> {
    return this.pizzaService.create(createPizzaDto);
  }

  /**
   * Retrieves all pizzas.
   * @returns A list of all pizzas.
   */
  @Get()
  @ApiOkResponse({ description: 'The pizzas have been successfully retrieved.', type: [Pizza] })
  async findAll(): Promise<Pizza[]> {
    return this.pizzaService.findAll();
  }

  /**
   * Retrieves a pizza by its ID.
   * @param id The ID of the pizza to retrieve.
   * @returns The pizza with the given ID.
   * @throws {NotFoundException} If no pizza with the given ID exists.
   */
  @Get(':id')
  @ApiOkResponse({ description: 'The pizza has been successfully retrieved.', type: Pizza })
  @ApiNotFoundResponse({ description: 'Pizza not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Pizza> {
    return this.pizzaService.findOne(id);
  }

  /**
   * Updates a pizza by its ID.
   * @param id The ID of the pizza to update.
   * @param updatePizzaDto The data to update the pizza with.
   * @returns The updated pizza.
   * @throws {BadRequestException} If the input data is invalid.
   * @throws {NotFoundException} If no pizza with the given ID exists.
   */
  @Put(':id')
  @ApiOkResponse({ description: 'The pizza has been successfully updated.', type: Pizza })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiNotFoundResponse({ description: 'Pizza not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updatePizzaDto: UpdatePizzaDto,
  ): Promise<Pizza> {
    return this.pizzaService.update(id, updatePizzaDto);
  }

  /**
   * Deletes a pizza by its ID.
   * @param id The ID of the pizza to delete.
   * @returns void
   * @throws {NotFoundException} If no pizza with the given ID exists.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'The pizza has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Pizza not found.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.pizzaService.remove(id);
  }
}
```