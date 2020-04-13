import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from './category-item/category-item.component';
import { CategoryListComponent } from './category-list/category-list.component';
import {HttpClientModule} from '@angular/common/http';
import {CategoryService} from './common/service/category.service';
import {PostModule} from '../post/post.module';
import {RouterModule} from '@angular/router';
import { AdminCategoryItemComponent } from './admin-category-item/admin-category-item.component';
import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CategoryFormService} from './common/service/category-form.service';



@NgModule({
  declarations: [CategoryItemComponent,
        CategoryListComponent,
        AdminCategoryItemComponent,
        AdminCategoryListComponent,
        CategoryAddComponent,
        CategoryEditComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    CategoryListComponent,
    AdminCategoryListComponent
  ],
  providers: [CategoryService, CategoryFormService]
})
export class CategoryModule { }
