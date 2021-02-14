
import { AuthDTO } from './auth.dto';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {
  }

  async signUp(authCredentialsDto: AuthDTO) : Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthDTO): Promise<{accessToken: string}> {
    const username = await this.userRepository.validatePassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Bad Creds');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return {accessToken};
  }


}
