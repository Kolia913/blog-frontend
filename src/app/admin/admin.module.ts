import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import {PostModule} from '../post/post.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminPostComponent } from './admin-post/admin-post.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import {RouterModule} from '@angular/router';
import {CategoryModule} from '../category/category.module';


@NgModule({
  declarations: [MainComponent, AdminPostComponent, AdminCategoryComponent],
    imports: [
        CommonModule,
        PostModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        CategoryModule
    ]
})
export class AdminModule { }
