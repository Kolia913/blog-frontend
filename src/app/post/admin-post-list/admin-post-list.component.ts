import {Component, DoCheck, OnInit} from '@angular/core';
import {PostService} from '../common/service/post.service';
import {PostModel} from '../common/model/post.model';

@Component({
  selector: 'app-admin-post-list',
  templateUrl: './admin-post-list.component.html',
  styleUrls: ['./admin-post-list.component.css']
})
export class AdminPostListComponent implements OnInit, DoCheck {
  page = 1;
  pageSize = 3;
  error: string
  constructor(readonly postService: PostService) { }

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
