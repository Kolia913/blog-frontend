import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {PostService} from '../../post/common/service/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private readonly postService: PostService) { }

  ngOnInit(): void {
  }

}
