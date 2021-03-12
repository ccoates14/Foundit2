import { User, UserDocument } from './users.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './../auth/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  public async userExists(username: string): Promise<boolean>{
    const user: User = await this.getUser(username);

    if (user && user.username == username) {
      return true;
    } 

    return false;
  }

  public async signIn(authCredentialsDto: AuthDTO, jwtService: JwtService): Promise<{ accessToken: string }> {
    if (!await this.userExists(authCredentialsDto.username)) {
      throw new UnauthorizedException('Bad Creds'); 
    }
    const actualPassword = await this.lookUpPassword(authCredentialsDto.username);
    const incommingPassword = authCredentialsDto.password;
    const salt = await this.lookUpSalt(authCredentialsDto.username);
    const validated = await this.validatePassword(incommingPassword, salt, actualPassword);

    if (!validated) {
      throw new UnauthorizedException('Bad Creds');
    }

    const payload: JwtPayload = { username: authCredentialsDto.username };
    const accessToken = await jwtService.sign(payload);

    return {accessToken};
  }


  public async signUp(authCredentialsDto: AuthDTO): Promise<Boolean>{
    if (await this.userExists(authCredentialsDto.username)) throw new ConflictException('username already exists!');

    const salt = await bcrypt.genSalt();
    const userData = {
      username: authCredentialsDto.username,
      password: await this.hashPassword(authCredentialsDto.password, salt),
      salt
    }

    const user = await new this.userModel(userData);
    try {
      user.save();
      return true;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  public async getUser(username: string): Promise<User>{
    return this.userModel.findOne({username}).exec();
    //return new User();
  }

  public async getAllUsers(limit: number=-1): Promise<Array<User>>{
    let query = this.userModel.find({});

    if (limit){
      return query.limit(limit).exec();
    }

    return query.exec();
  }

  private async hashPassword(password: string, salt: string): Promise<string>{
    return bcrypt.hash(password, salt);
  }

  private async validatePassword(incomingPassword: string, usersSalt: string, usersPassword: string): Promise<boolean>{
    const hash = await bcrypt.hash(incomingPassword, usersSalt);
    return hash === usersPassword;
  }

  private async lookUpPassword(username: string): Promise<string>{
    const user = await this.getUser(username);
    
    return user.password;
  }

  private async lookUpSalt(username: string): Promise<string>{
    const user = await this.getUser(username);

    return user.salt;
  }
}
