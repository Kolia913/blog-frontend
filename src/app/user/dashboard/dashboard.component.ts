import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {UserService} from '../common/service/user.service';
import {Observable} from 'rxjs';
import {UserModel} from '../common/model/user.model';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user?: Observable<UserModel>
  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser(this.userService.getId())
  }
}
