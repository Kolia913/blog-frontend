import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommentModel} from '../model/comment.model';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from '../../../user/common/service/user.service';
import {PostModel} from '../../../post/common/model/post.model';
import {TokenModel} from '../../../common/model/token.model';
import {PostService} from '../../../post/common/service/post.service';

@Injectable()
export class CommentService {
  baseUrl = 'http://localhost:3000/api/';
  helper = new JwtHelperService()
  constructor(private readonly http: HttpClient,
              private readonly userService: UserService,
              private readonly postService: PostService) {
  }
  add(data: FormData): Observable<CommentModel> {
    return this.http.post<CommentModel>(`${this.baseUrl}comments/add`, data, {
      headers: new HttpHeaders({
        'auth-token': localStorage.getItem('access-token')
      })
    })
  }
  getPostComments(slug: string): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.baseUrl}comments/${slug}`)
  }
  remove(id: string): Observable<CommentModel> {
    return this.http.delete<CommentModel>(`${this.baseUrl}comments/remove/${id}`, {
      headers: new HttpHeaders({
        'auth-token': localStorage.getItem('access-token')
      })
    })
  }
  sortByDate(comments: CommentModel[]): CommentModel[] {
    return comments.slice()
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }
  canDelete(comment: CommentModel): boolean {
    let result = false
    const token: TokenModel = this.helper.decodeToken(localStorage.getItem('access-token'))
    if (this.userService.isLoggedIn()) {
      result = token._id === comment.authorId
    }
    return result
  }
}
