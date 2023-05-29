import { Injectable, Logger, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { User } from '../auth/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {

  private readonly logger = new Logger('EventService');

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(user: User): Promise<Event[]> {
    if (user.roles.includes('admin')) {
      return this.eventRepository.find();
    } else {
      return this.eventRepository.find({
        where: { status: 'published' }
      });
    }
  }

  async findOne(id: number, user: User): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
    });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    if (event.status === 'draft' && !user.roles.includes('admin')) {
      throw new UnauthorizedException('Only administrators can see draft events');
    }
    return event;
  }

  async create(createEventDto: CreateEventDto, user: User): Promise<Event> {
    if (!user.roles.includes('admin')) {
      throw new UnauthorizedException('Only administrators can create events');
    }
    const event = this.eventRepository.create(createEventDto);
    return this.eventRepository.save({
      ...event,
      user,
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto, user: User): Promise<Event> {
    if (!user.roles.includes('admin')) {
      throw new UnauthorizedException('Only administrators can update events');
    }
    await this.eventRepository.update(id, updateEventDto);
    return this.findOne(id, user);
  }

  async delete(id: number, user: User): Promise<void> {
    if (!user.roles.includes('admin')) {
      throw new UnauthorizedException('Only administrators can delete events');
    }
    await this.eventRepository.delete(id);
  }
}


