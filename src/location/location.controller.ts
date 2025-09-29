import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

/**
 * Controller for managing locations.
 */
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /**
   * Creates a new location.
   * @param createLocationDto - The data for creating the location.
   * @returns The created location.
   */
  @Post()
  create(@Body(new ValidationPipe()) createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  /**
   * Retrieves all locations.
   * @returns A list of all locations.
   */
  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  /**
   * Retrieves a location by its ID.
   * @param id - The ID of the location to retrieve.
   * @returns The location with the specified ID.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.findOne(id);
  }

  /**
   * Updates a location by its ID.
   * @param id - The ID of the location to update.
   * @param updateLocationDto - The data for updating the location.
   * @returns The updated location.
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  /**
   * Deletes a location by its ID.
   * @param id - The ID of the location to delete.
   * @returns A success message.
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.remove(id);
  }
}