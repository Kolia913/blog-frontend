import {Injectable} from '@angular/core';
import {UserModel} from '../model/user.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {UserLoginModel} from '../model/user-login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import {TokenModel} from '../../../common/model/token.model';
import {UserEditModel} from '../model/user-edit.model';

@Injectable()
export class UserService {
  baseUrl = 'http://localhost:3000/api/'
  helper = new JwtHelperService()
  constructor(private readonly http: HttpClient) {
  }
  login(user: UserLoginModel): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}user/login`, user)
  }
  logout(): void {
    localStorage.removeItem('access-token')
  }
  checkToken(): void {
   if (this.helper.isTokenExpired(localStorage.getItem('access-token'))) {
     return this.logout()
    }
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access-token');
  }
  getId(): string {
    const token: TokenModel = this.helper.decodeToken(localStorage.getItem('access-token'))
    if (!token) {
      console.log(`No access token`)
      return
    }
    return token._id
  }
  getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}user/${id}`)
  }

  editUser(user: UserEditModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.baseUrl}user/edit`, user, {
      headers: new HttpHeaders({
        'auth-token': localStorage.getItem('access-token')
      })
    })
  }
  registerUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}user/register`, user)
  }
}

