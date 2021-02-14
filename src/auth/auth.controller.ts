import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }
  
  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentials: AuthDTO): Promise<void>{
    return this.authService.signUp(authCredentials);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) authCredentials: AuthDTO): Promise<{ accessToken: string }>{
    return this.authService.signIn(authCredentials);
  }

}
