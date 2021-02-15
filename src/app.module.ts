import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/foundit'), //that will need to get injected later
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web_app/dist')
    }),
    UsersModule,
    AuthModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}