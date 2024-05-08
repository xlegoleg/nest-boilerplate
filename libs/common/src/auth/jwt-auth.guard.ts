import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from 'libs/common/src/dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.switchToHttp()?.getRequest()?.cookies?.Authentication;
    if (!token) {
      return false;
    }
    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: token,
      })
      .pipe(
        tap((v) => {
          context.switchToHttp().getRequest().user = v;
        }),
        map(() => true),
      );
  }
}
