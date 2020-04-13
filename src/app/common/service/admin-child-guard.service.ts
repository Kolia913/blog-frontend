import {Injectable} from '@angular/core';
import {CanActivateChild, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenModel} from '../model/token.model';

@Injectable()
export class AdminChildGuardService implements CanActivateChild {
  helper = new JwtHelperService()
  constructor(private readonly router: Router) {
  }
  canActivateChild(): boolean {
    const token = localStorage.getItem('access-token')
    if (this.helper.isTokenExpired(token)) {
      this.router.navigate(['/login']).catch(err => console.log(err))
      return false
    }
    const adminToken: TokenModel = this.helper.decodeToken(localStorage.getItem('access-token'))
    if (!adminToken.admin) {
      this.router.navigate(['/']).catch(err => console.log(err))
      return false
    }
    return true
  }
}
