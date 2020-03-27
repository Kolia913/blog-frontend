import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PostService} from '../common/service/post.service';
import {map, startWith} from 'rxjs/operators';
import {PostModel} from '../common/model/post.model';
import {combineLatest, Observable, of} from 'rxjs';

class State {
}

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {
  search = new FormControl('')
  constructor(private readonly postService: PostService) {
  }
  ngOnInit(): void {
    this.search.valueChanges.subscribe(value => {
       this.postService.searchPosts(value)
       console.log(this.postService.filteredPosts)
    })
  }
}
