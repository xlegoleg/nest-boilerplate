import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@app/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDto } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user, @Res({ passthrough: true }) response) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: { user: UserDto }) {
    return data.user;
  }
}
