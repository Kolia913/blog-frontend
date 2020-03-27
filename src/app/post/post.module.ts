import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from './post-item/post-item.component';
import { PostShowComponent } from './post-show/post-show.component';
import { PostListComponent } from './post-list/post-list.component';
import {HttpClientModule} from '@angular/common/http';
import {PostService} from './common/service/post.service';
import {CategoryModule} from '../category/category.module';
import {RouterModule} from '@angular/router';
import { UserPostItemComponent } from './user-post-item/user-post-item.component';
import { UserPostListComponent } from './user-post-list/user-post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostAddComponent } from './post-add/post-add.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostFormService} from './common/service/post-form.service';
import { SearchPostComponent } from './search-post/search-post.component';
import { PostSearchListComponent } from './post-search-list/post-search-list.component';

@NgModule({
   declarations: [PostItemComponent,
     PostShowComponent,
     PostListComponent,
     UserPostItemComponent,
     UserPostListComponent,
     PostEditComponent,
     PostAddComponent,
     SearchPostComponent,
     PostSearchListComponent],
  exports: [
    PostListComponent,
    UserPostListComponent,
    SearchPostComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CategoryModule,
    RouterModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [PostService, PostFormService]
})
export class PostModule { }