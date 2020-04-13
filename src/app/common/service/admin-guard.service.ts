import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenModel} from '../model/token.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AdminGuardService implements CanActivate {
  helper = new JwtHelperService()
  constructor(private readonly router: Router) {
  }
  canActivate(): boolean {
    const token: TokenModel = this.helper.decodeToken(localStorage.getItem('access-token'))
    if (!token.admin) {
      this.router.navigate(['/']).catch(err => console.log(err))
      return false
    }
    return true
  }
}
