import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthService } from 'ng-gapi';

// interface GoogleUser{

// }
@Injectable({
  providedIn: 'root',
})
export class GauthService {
  public static SESSION_STORAGE_KEY: string = 'accessToken';
  public static SESSION_STORAGE_PROFILE_KEY: string = 'userId';

  // private user: GoogleUser;
  user;

  constructor(
    private googleAuth: GoogleAuthService,
    private router: Router,
    private zone: NgZone
  ) {}

  // function to getUserToken
  public getToken(): string {
    let token: string = sessionStorage.getItem(
      GauthService.SESSION_STORAGE_KEY
    );
    // if (!token) {
    //     return("no token set , authentication required");
    // }
    return sessionStorage.getItem(GauthService.SESSION_STORAGE_KEY) || '';
  }

  // function to get user Id
  public getUserId(): string {
    // let token: string = sessionStorage.getItem(GauthService.SESSION_STORAGE_KEY);
    // if (!token) {
    //     return("no token set , authentication required");
    // }
    return (
      sessionStorage.getItem(GauthService.SESSION_STORAGE_PROFILE_KEY) || ''
    );
  }
  // function to signIn using GAPI
  public signIn(): void {
    this.googleAuth.getAuth().subscribe((auth) => {
      auth.signIn().then((res) => this.signInSuccessHandler(res));
    });
  }
  // GoogleUser
  signInSuccessHandler(res: any) {
    this.user = res;
    console.log(this.user, res.getBasicProfile().Qt);

    sessionStorage.setItem(
      GauthService.SESSION_STORAGE_KEY,
      res.getAuthResponse().access_token
    );
    sessionStorage.setItem(
      GauthService.SESSION_STORAGE_PROFILE_KEY,
      res.getBasicProfile().Qt
    );
    this.routeAfterLogin();
  }

  hardSign() {
 

    sessionStorage.setItem(
      GauthService.SESSION_STORAGE_KEY,
      'hardcodedSignIn'
    );
    sessionStorage.setItem(
      GauthService.SESSION_STORAGE_PROFILE_KEY,
      'hardcodedSignIn'
    );
    this.routeAfterLogin();
  }
  // function to logout and erase data on session storage
  logout() {
    sessionStorage.setItem(GauthService.SESSION_STORAGE_KEY, '');
    sessionStorage.setItem(GauthService.SESSION_STORAGE_PROFILE_KEY, '');
    this.zone.run(() => {
      this.router.navigate(['login']);
    });
  }

  routeAfterLogin() {
    // ngZone issue workaround
    this.zone.run(() => {
      this.router.navigate(['']);
    });
  }
}
