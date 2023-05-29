import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Request } from 'express';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto, @Req() req: Request) {
    return await this.eventService.create(createEventDto, req.user);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return await this.eventService.findAll(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return await this.eventService.findOne(+id, req.user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @Req() req: Request) {
    return await this.eventService.update(+id, updateEventDto, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    return await this.eventService.delete(+id, req.user);
  }
}

