import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {PostService} from '../../post/common/service/post.service';

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit {
  adminSearch = new FormControl('');

  constructor(private readonly postService: PostService) { }

  ngOnInit(): void {
    this.adminSearch.valueChanges.subscribe(value => {
      this.postService.searchPosts(value)
    })
  }

}
