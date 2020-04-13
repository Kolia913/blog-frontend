import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {UserService} from '../../user/common/service/user.service';
import {Observable} from 'rxjs';
import {UserModel} from '../../user/common/model/user.model';
import {PostService} from '../../post/common/service/post.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  signedIn: boolean;
  isSearching: boolean;
  filter = new FormControl('');
  constructor(readonly userService: UserService,
              private readonly postService: PostService) {this.isSearching = false}

  ngOnInit(): void {
  }
   async ngDoCheck(): Promise<void> {
      this.userService.checkToken()
      this.signedIn = this.userService.isLoggedIn()
  }

  logOut(): void {
    this.userService.logout()
    window.location.reload()
  }

  search() {
    this.isSearching = !this.isSearching
    this.filter.valueChanges.subscribe(value => {
      this.postService.searchPosts(value)
    })
  }
}
