import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {UserService} from '../../user/common/service/user.service';
import {Observable} from 'rxjs';
import {UserModel} from '../../user/common/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  signedIn: boolean;
  constructor(readonly userService: UserService) { }

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
}
