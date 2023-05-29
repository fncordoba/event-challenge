import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.user.id;  // Aquí asumimos que el id del usuario está disponible en req.user
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    req.user = user;  // Aquí estamos asignando la instancia de User a req.user
    next();
  }
}
