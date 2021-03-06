import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login.model';

const users: LoginModel[] = [];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(1000))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/ApiServicice/register') && method === 'POST':
          return register();
        case url.endsWith('/ApiServicice/login') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }
    function register() {
      const user = body;
      if (users.find((x) => x.email === user.email)) {
        return error('Username "' + user.email + '" exist');
      }
      users.push(user);
      return ok();
    }

    function authenticate() {
      const { email, pass } = body;

      const user = users.find((x) => x.email === email && x.pass === pass);
      if (!user) {
        return error('Email or password is incorrect');
      }
      return ok({
        response: 'true',
        email: user.email,
        token: 'jwt-token-de-andar-por-casa',
      });
    }
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ error: { message } });
    }
  }
}
