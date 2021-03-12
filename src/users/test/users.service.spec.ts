import { AuthDTO } from './../../auth/auth.dto';
import { closeInMongodConnection, rootMongooseTestModule } from '../../../test/util/TestMongoConfig';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { User, UserSchema } from '../users.schema';


describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{
          name: User.name,
          schema: UserSchema
        }])
      ],
      providers: [UsersService],

    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be able to sign up', async () => {
    let authDto : AuthDTO = {username: 'chan123', password: 'ZedZed1234!$'};
    let success = await service.signUp(authDto);
    expect(success).toEqual(true);
    let user = await service.getUser(authDto.username);
    let users = await service.getAllUsers();
    expect(user).toBeTruthy();
    expect(users).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    //expect(user.username).toEqual(authDto.username);
    
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
