import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const [bearer, token] = request.headers.authorization.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException();
      }
      this.jwtService.verify(token);

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
