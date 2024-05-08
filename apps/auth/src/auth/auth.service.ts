import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserDto } from '@app/common';
import { ITokenPayload } from '../types/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDto, response: Response) {
    const tokenPayload: ITokenPayload = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        Number(this.configService.get('JWT_EXPIRATION') ?? 0),
    );
    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
