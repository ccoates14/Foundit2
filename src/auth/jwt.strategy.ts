import { User } from './../users/users.schema';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topsecret51'
    });
  }

  async validate(payload: JwtPayload): Promise<User>{
    const { username } = payload;
    const user = await this.userService.getUser(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}