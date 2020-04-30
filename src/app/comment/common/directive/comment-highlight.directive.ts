import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenModel} from '../../../common/model/token.model';

@Directive({
  selector: '[appComment]'
})
export class CommentHighlightDirective implements OnInit {
  @Input() authorId: string
  helper = new JwtHelperService()
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const token: TokenModel = this.helper.decodeToken(localStorage.getItem('access-token'))
    this.el.nativeElement.style.width = '100%'
    this.el.nativeElement.style.display = 'block'
    this.el.nativeElement.style.padding = '0.5rem'
    this.el.nativeElement.style.borderRadius = '0.5rem'
    this.el.nativeElement.style.margin = '0.5rem'
    this.el.nativeElement.style.whiteSpace = 'pre-wrap'
    this.el.nativeElement.style.backgroundColor = '#ffffff'
    if (token) {
      if (this.authorId === token._id) {
        this.el.nativeElement.style.backgroundColor = '#dedede'
      }
    }
  }
}
