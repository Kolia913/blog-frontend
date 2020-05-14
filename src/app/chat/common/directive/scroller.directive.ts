import {AfterViewChecked, Directive, ElementRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[scroller]'
})
export class ScrollerDirective implements AfterViewChecked{

  constructor(private el: ElementRef) { }
  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }
  private scrollToBottom() {
    this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight
  }
}
