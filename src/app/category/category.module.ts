import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from './category-item/category-item.component';
import { CategoryListComponent } from './category-list/category-list.component';
import {HttpClientModule} from '@angular/common/http';
import {CategoryService} from './common/service/category.service';
import {PostModule} from '../post/post.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [CategoryItemComponent, CategoryListComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
    ],
  exports: [
    CategoryListComponent
  ],
  providers: [CategoryService]
})
export class CategoryModule { }
