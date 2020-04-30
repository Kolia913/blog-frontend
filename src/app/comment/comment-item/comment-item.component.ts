import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from '../common/model/comment.model';
import {UserService} from '../../user/common/service/user.service';
import anchorme from 'anchorme';
import {CommentService} from '../common/service/comment.service';
import {PostService} from '../../post/common/service/post.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: CommentModel
  @Input() postAuthor: string
  userName: string
  content: string
  canDelete: boolean
  constructor(private readonly userService: UserService,
              readonly commentService: CommentService) {
  }

  ngOnInit(): void {
    this.userService.getUser(this.comment.authorId).subscribe(user => {
      console.log(this.comment)
      this.userName = user.name
    }, err => {console.log(err)})
    this.content = anchorme(this.comment.content)
    this.canDelete = !(this.commentService.canDelete(this.comment) || this.postAuthor !== this.comment.authorId)
  }

  deleteComment(id: string) {
    alert('Delete this comment?')
    this.commentService.remove(id).subscribe( comment => {
      alert('Comment: ' + comment.content.substr(0, 10) + '...' + 'deleted!')
      window.location.reload()
    }, err => console.log(err))
  }
}
