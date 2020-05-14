import {Component, DoCheck, OnInit} from '@angular/core';
import {PostService} from '../common/service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styles: []
})
export class PostListComponent implements OnInit, DoCheck {
  page = 1;
  pageSize = 5;
  error: string;
  constructor(readonly postService: PostService) {
  }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    if (this.postService.filteredPosts) {
      if (this.postService.filteredPosts.length === 0) {
        this.error = `Nothing to show:(`
      } else {
        this.error = null
      }
    }
  }
}
