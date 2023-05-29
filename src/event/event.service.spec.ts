import { EventService } from "./event.service";
import { Repository } from "typeorm";
import { Event } from "./entities/event.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('EventService', () => {
  let service: EventService;
  let repo: Repository<Event>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new Event()),
            create: jest.fn().mockReturnValue(new Event()),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    repo = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const result = await service.findAll(
        { roles: ['admin'] } as any
      );
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an event', async () => {
      const result = await service.findOne(1, { roles: ['admin'] } as any);
      expect(result).toEqual(new Event());
    });
  });

  describe('create', () => {
    it('should create an event', async () => {
      const result = await service.create(
        {} as any,
        { roles: ['admin'] } as any
      );
      expect(result).toEqual(new Event());
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const result = await service.update(
        1,
        {} as any,
        { roles: ['admin'] } as any
      );
      expect(result).toEqual(new Event());
    });
  });
});
