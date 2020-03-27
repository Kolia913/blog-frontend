import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './post/post-list/post-list.component';
import {PostShowComponent} from './post/post-show/post-show.component';
import {LoginComponent} from './user/login/login.component';
import {DashboardComponent} from './user/dashboard/dashboard.component';
import {EditProfileComponent} from './user/edit-profile/edit-profile.component';
import {register} from 'ts-node';
import {RegisterComponent} from './user/register/register.component';
import {AuthGuardService} from './common/service/auth-guard.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {PostEditComponent} from './post/post-edit/post-edit.component';
import {EditGuardService} from './common/service/edit-guard.service';
import {PostAddComponent} from './post/post-add/post-add.component';
import {PostSearchListComponent} from './post/post-search-list/post-search-list.component';
import {SearchPostComponent} from './post/search-post/search-post.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/posts'
  },
  {
    path: 'posts',
    component: PostListComponent,
  },
  {
    path: 'posts/:slug',
    component: PostShowComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'dashboard/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'posts/edit/:slug',
    component: PostEditComponent,
    canActivate: [AuthGuardService, EditGuardService]
  },
  {
    path: 'add-post',
    component: PostAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'search-posts',
    component: SearchPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
