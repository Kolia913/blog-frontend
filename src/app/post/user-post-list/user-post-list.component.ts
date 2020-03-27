import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../category/common/service/category.service';
import {PostService} from '../common/service/post.service';
import {UserService} from '../../user/common/service/user.service';
import {PostModel} from '../common/model/post.model';

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.css']
})
export class UserPostListComponent implements OnInit {
  posts?: PostModel[]
  page = 1;
  pageSize = 3;
  constructor(private readonly postService: PostService,
              private readonly userService: UserService) { }

  ngOnInit(): void {
    this.postService.getCurrentUserPosts(this.userService.getId()).subscribe( items => {
      this.posts = items.reverse()
      console.log(items)
    },
      err => {
      console.log(err)
    })
  }

}
