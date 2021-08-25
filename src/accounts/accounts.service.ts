import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/db/user.entity';
import { UserDto } from 'src/login/Dto/user.dto';
import { LoginUserDto } from 'src/login/Dto/loginUser.dto';
import { CreateUserDto } from 'src/login/Dto/createUser.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  private users: CreateUserDto[] = [];
  async create(newUser: CreateUserDto): Promise<UserDto> {
    const busyEmail = await !!this.users.find((user) => {
      return user.email === newUser.email;
    });
    if (busyEmail) {
      throw new Error('Email is busy');
    } else {
      this.usersRepository.create(newUser);
      this.users.push(newUser);
      return new UserDto(newUser.name, newUser.age, newUser.email);
    }
  }
  logIn(loginUserDto: LoginUserDto): Promise<UserDto> {
    return new Promise((resolve, reject) => {
      const findUser = this.users.find((user) => {
        return (
          user.email === loginUserDto.email &&
          user.password === loginUserDto.password
        );
      });
      if (!findUser) {
        reject(new Error('Wrong email or password'));
      } else {
        resolve(new UserDto(findUser.name, findUser.age, findUser.email));
      }
    });
  }
}
