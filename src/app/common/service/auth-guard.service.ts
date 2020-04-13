import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthGuardService implements CanActivate {
  helper = new JwtHelperService()
  constructor(public router: Router) {
  }
  canActivate(): boolean {
    const token = localStorage.getItem('access-token')
    if (this.helper.isTokenExpired(token)) {
       this.router.navigate(['/login']).catch(err => console.log(err))
       return false
     }
    return true
  }

}
