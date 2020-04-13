import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './post/post-list/post-list.component';
import {PostShowComponent} from './post/post-show/post-show.component';
import {LoginComponent} from './user/login/login.component';
import {DashboardComponent} from './user/dashboard/dashboard.component';
import {EditProfileComponent} from './user/edit-profile/edit-profile.component';
import {RegisterComponent} from './user/register/register.component';
import {AuthGuardService} from './common/service/auth-guard.service';
import {PostEditComponent} from './post/post-edit/post-edit.component';
import {EditGuardService} from './common/service/edit-guard.service';
import {PostAddComponent} from './post/post-add/post-add.component';
import {NotFoundComponent} from './markup/not-found/not-found.component';
import {MainComponent} from './admin/main/main.component';
import {AdminGuardService} from './common/service/admin-guard.service';
import {AdminPostComponent} from './admin/admin-post/admin-post.component';
import {AdminCategoryComponent} from './admin/admin-category/admin-category.component';
import {AdminChildGuardService} from './common/service/admin-child-guard.service';
import {CategoryEditComponent} from './category/category-edit/category-edit.component';
import {CategoryAddComponent} from './category/category-add/category-add.component';

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
    path: 'admin',
    component: MainComponent,
    canActivate: [AuthGuardService, AdminGuardService],
    canActivateChild: [AdminChildGuardService],
    children: [
      {
        path: 'posts',
        component: AdminPostComponent,
      },
      {
        path: 'categories',
        component: AdminCategoryComponent,
        canActivateChild: [AdminChildGuardService],
        children: [
          {
            path: 'add',
            component: CategoryAddComponent
          },
          {
            path: 'edit/:slug',
            component: CategoryEditComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
