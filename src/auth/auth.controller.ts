import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthDTO } from './auth.dto';


@Controller('auth')
export class AuthController {

  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) { }
  
  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentials: AuthDTO): Promise<void>{
    return this.userService.signUp(authCredentials);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) authCredentials: AuthDTO): Promise<{ accessToken: string }>{
    return this.userService.signIn(authCredentials, this.jwtService);
  }

}
