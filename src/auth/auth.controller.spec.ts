import { UsersModule } from './../users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { closeInMongodConnection, rootMongooseTestModule } from './../../test/util/TestMongoConfig';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './../users/users.schema';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{
          name: User.name,
          schema: UserSchema
        }
        ]),
        UsersModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
          secret: 'topsecret51', //this will get changed later
          signOptions: {
            expiresIn: 3600 * 48 //48 hours
          }
        }),
      ],
      controllers: [AuthController],
      providers: [JwtStrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
