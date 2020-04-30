import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import {CommentService} from './common/service/comment.service';
import {ReactiveFormsModule} from '@angular/forms';
import { CommentHighlightDirective } from './common/directive/comment-highlight.directive';
import {RouterModule} from '@angular/router';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CommentItemComponent, CommentListComponent, CommentHighlightDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbPaginationModule
  ],
  providers: [CommentService],
  exports: [CommentListComponent]
})
export class CommentModule { }
