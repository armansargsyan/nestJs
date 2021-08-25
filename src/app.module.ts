import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { AccountsService } from './accounts/accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'opium',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController, LoginController],
  providers: [AppService, AccountsService],
})
export class AppModule {}
