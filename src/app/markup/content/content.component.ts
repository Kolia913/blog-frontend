import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  isChatOpened: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  openChat(): void {
      this.isChatOpened = !this.isChatOpened
  }
}
