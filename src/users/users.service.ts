import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(private readonly userRepo: UserRepository){}

  async userExists(username: string): Promise<boolean>{
    return this.userRepo.containsUser(username);
  }
}
