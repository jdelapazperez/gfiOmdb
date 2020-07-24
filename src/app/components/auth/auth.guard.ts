import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService){}

  canActivate(route: ActivatedRouteSnapshot){
    // simulamos que no hay sesion
    const userData = this.authService.userData;

    if (userData) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
