import { Body, Controller, Post } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateUserDto } from './Dto/createUser.dto';
import { LoginUserDto } from './Dto/loginUser.dto';
import { UserDto } from './Dto/user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly accountService: AccountsService) {}
  @Post()
  async logIn(@Body() loginUserDto: LoginUserDto): Promise<UserDto> {
    return this.accountService.logIn(loginUserDto);
  }
  @Post('newAccount')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.accountService.create(createUserDto);
      return user;
    } catch (error) {
      return error;
    }

    // return this.accountService.create(createUserDto);
  }
}
