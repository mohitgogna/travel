import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {    
    if (this.auth.getToken()) {
      request = this.addToken(request, this.auth.getToken());
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string | null) {
    //console.log(token);
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'x-auth-token': `${token}`
      }
    })
  }
}
