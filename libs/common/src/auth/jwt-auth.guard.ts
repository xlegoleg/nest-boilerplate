import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from 'libs/common/src/dto';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private logger = new Logger(JwtAuthGuard.name);

  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token =
      context.switchToHttp()?.getRequest()?.cookies?.Authentication ||
      context.switchToHttp().getRequest()?.headers?.authentication;
    if (!token) {
      return false;
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: token,
      })
      .pipe(
        tap((v) => {
          roles?.forEach((role) => {
            if (!v?.roles.includes(role)) {
              this.logger.error(
                'User do not have a needed tole for this action',
                role,
              );
              throw new UnauthorizedException();
            }
          });
          context.switchToHttp().getRequest().user = v;
        }),
        map(() => true),
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        }),
      );
  }
}
