import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../common/service/comment.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormDataService} from '../../form-data/common/service/form-data.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenModel} from '../../common/model/token.model';
import {UserService} from '../../user/common/service/user.service';
import {CommentModel} from '../common/model/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() postSlug: string
  @Input() postAuthor: string
  comments: CommentModel[]
  commentForm: FormGroup;
  helper = new JwtHelperService()
  page = 1
  pageSize = 10
  constructor(readonly commentService: CommentService,
              readonly userService: UserService,
              private readonly fb: FormBuilder,
              private readonly formDataService: FormDataService) {
    this.commentForm = this.fb.group({
      content: new FormControl({value: '', disabled: !userService.isLoggedIn()}, [Validators.required, Validators.maxLength(1024)])
    })
  }

  ngOnInit(): void {
    this.commentService.getPostComments(this.postSlug).subscribe(items => {
      this.comments = this.commentService.sortByDate(items)
    }, err => console.log(err))
  }

  async submit(): Promise<void> {
    if (this.commentForm.invalid) {
      return
    }
    const token: TokenModel = this.helper.decodeToken(localStorage.getItem('access-token'));
    if (token) {
      const data = this.formDataService.formGroupToFormData(this.commentForm)
      data.append('postSlug', this.postSlug)
      data.append('authorId', token._id)
      await this.commentService.add(data).subscribe( comment => {
        window.location.reload()
      }, err => console.log(err))
    }
  }
}
