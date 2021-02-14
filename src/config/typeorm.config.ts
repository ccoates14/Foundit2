import { User } from './../users/users.entity';

import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ZedZed1234!$',
  database: 'Foundit',
  synchronize: true,
  logging: true,
  entities: [User]
}