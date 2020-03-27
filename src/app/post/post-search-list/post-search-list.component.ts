import {Component, DoCheck, OnInit} from '@angular/core';
import {PostService} from '../common/service/post.service';
import {PostModel} from '../common/model/post.model';

@Component({
  selector: 'app-post-search-list',
  templateUrl: './post-search-list.component.html',
  styleUrls: ['./post-search-list.component.css']
})
export class PostSearchListComponent implements OnInit, DoCheck {
  page = 1;
  pageSize = 5;
  error: string;
  constructor(readonly postService: PostService) {
  }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    if (this.postService.filteredPosts.length === 0) {
      this.error = `Nothing to show:(`
    } else {
      this.error = null
    }
  }
}
