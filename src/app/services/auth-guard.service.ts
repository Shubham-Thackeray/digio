import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
// import { AuthService } from './auth.service';
// import { ToasterService } from '../services/toaster/toaster.service';
import { GauthService } from './gauth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: GauthService,
    private router: Router,
    // private toast: ToasterService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.getToken() ;
    if (currentUser) {
      if (state.url === 'login') {
        this.router.navigate(['']);
      }
      return true;
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    // not logged in so redirect to login page with the return url
    return false;
  }
}
