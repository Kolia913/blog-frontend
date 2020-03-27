import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {UserService} from './common/service/user.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {RouterModule} from '@angular/router';
import {PostModule} from '../post/post.module';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, DashboardComponent, EditProfileComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PostModule
  ],
  providers: [UserService]
})
export class UserModule { }
