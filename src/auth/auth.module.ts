import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
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
  exports: [
    JwtStrategy,
    PassportModule,

  ]
})
export class AuthModule {}