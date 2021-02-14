import { UsersService } from './users.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService){}

  @Get('/exists/:username')
  async usernameExists(@Param('username') username: string): Promise<boolean>{
    return this.usersService.userExists(username);
  }
}
