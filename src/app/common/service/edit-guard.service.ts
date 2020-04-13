import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, PRIMARY_OUTLET, Router} from '@angular/router';
import {PostService} from '../../post/common/service/post.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenModel} from '../model/token.model';
import {map} from 'rxjs/operators';


@Injectable()
export class EditGuardService implements CanActivate {
  helper = new JwtHelperService()
  constructor(private readonly postService: PostService,
              public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!localStorage.getItem('access-token')) { return }
    const token: TokenModel = this.helper.decodeToken(localStorage.getItem('access-token'))
    if (!token.admin) {
      this.postService.get(route.paramMap.get('slug')).subscribe(item => {
        if (token._id !== item.authorId) {
          this.router.navigate(['/']).catch(err => console.log(err))
          return false
        }
        return true
      })
      return true
    }
    return true
  }
}
