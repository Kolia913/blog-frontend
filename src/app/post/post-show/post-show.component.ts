import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {PostModel} from '../common/model/post.model';
import {PostService} from '../common/service/post.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../user/common/service/user.service';
import {UserModel} from '../../user/common/model/user.model';
import anchorme from 'anchorme';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit {
  post?: Observable<PostModel>
  author?: Observable<UserModel>
  content?: string
  constructor(private readonly postService: PostService,
              private route: ActivatedRoute,
              private readonly userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug')
      this.post = this.postService.get(slug)
      this.post.subscribe(item => {
        this.author = this.userService.getUser(item.authorId)
        this.content = anchorme(item.content)
      })
    })
  }

}
