import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto, CurrentUser } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  createOne(@Body() user: CreateUserDto) {
    return this.userService.createOne(user);
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  currentUser(@CurrentUser() user: UserDto) {
    return user;
  }
}
