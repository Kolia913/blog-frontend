import {UserService} from './user.service';
import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserLoginModel} from '../model/user-login.model';
import {TokenModel} from '../../../common/model/token.model';
import {stringify} from 'querystring';
import {UserModel} from '../model/user.model';
import {UserEditModel} from '../model/user-edit.model';


describe('UserService', () => {
  const baseUrl = 'http://localhost:3000/api/'
  let httpTestingController: HttpTestingController
  let service: UserService
  let mockUser: UserModel
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
      ]
    })
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(UserService)

    var store = {}
    spyOn(localStorage, 'getItem').and.callFake( (key: string): string => {
      return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string =>  {
      return store[key] = <string> value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
      store = {};
    });
    mockUser = {
      email: 'mail@gmail.com',
      name: 'Johny',
      password: '111111'
    }
  })
  afterEach(() => {
    httpTestingController.verify()
  })
  it('should create UserService', () => {
    expect(service).toBeTruthy()
  });
  it('should login user', () => {
    const mockToken: string = 'jwt-token'
    const mockLoginUser: UserLoginModel = {
      email: 'mail@gmail.com',
      password: '111111'
    }
    service.login(mockLoginUser).subscribe(token => {
      expect(token).toEqual(mockToken)
    })
    httpTestingController.expectOne({
      method: 'POST',
      url: `${baseUrl}user/login`
    }).flush(mockToken)
  })
  it('should logout user', () => {
    localStorage.setItem('access-token', 'jwt-token')
    expect(localStorage.getItem('access-token')).toEqual('jwt-token')
    service.logout()
    expect(localStorage.getItem('access-token')).toBeNull()
  })
  it('should logout if token expired', () => {
    const spy = spyOn(service, 'logout')
    service.checkToken()
    expect(spy).toHaveBeenCalled()
  })
  it('should check is user logged in', () => {
    localStorage.setItem('access-token', 'jwt-token')
    expect(service.isLoggedIn()).toEqual(true)
    localStorage.removeItem('access-token')
    expect(service.isLoggedIn()).toEqual(false)
  });
  it('should get user id', () => {
    // tslint:disable-next-line:max-line-length
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiX2lkIjoiNWU0ODlkZnM5NzRhYmUiLCJhZG1pbiI6ImZhbHNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.uIAJnUZeTR1gT17gO2-m-svTLTlgBxq9MPMCjYAT8GI'
    const mockUserToken: TokenModel = {
      _id: '5e489dfs974abe',
      admin: false
    }
    localStorage.setItem('access-token', mockToken)
    const id = service.getId()
    expect(id).toEqual(mockUserToken._id)
  });
  it('should get user', () => {
    service.getUser('5e489dfs974abe').subscribe( user => {
      expect(user.name).toEqual('Johny')
    })
    httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}user/5e489dfs974abe`
    }).flush(mockUser)
  });
  it('should edit user', () => {
    const mockEditUser: UserEditModel = {
      email: 'mail_1@gmail.com',
      name: 'Johny',
      password: '111111',
      oldPassword: '111111'
    }
    localStorage.setItem('access-token', 'jwt-token')
    service.editUser(mockEditUser).subscribe(user => {
      expect(user.name).toEqual('Johny')
    })
    httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}user/edit`
    }).flush(mockUser)
  });

  it('should register user',  () => {
    service.registerUser(mockUser).subscribe( user => {
      expect(user.name).toEqual('Johny')
    })
    httpTestingController.expectOne({
      method: 'POST',
      url: `${baseUrl}user/register`
    }).flush(mockUser)
  });
})
