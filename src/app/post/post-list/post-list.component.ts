import { Component, OnInit } from '@angular/core';
import {PostService} from '../common/service/post.service';
import {PostModel} from '../common/model/post.model';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styles: []
})
export class PostListComponent implements OnInit {
  page = 1;
  pageSize = 5;
  constructor(readonly postService: PostService) {
  }

  ngOnInit(): void {
  }

}
