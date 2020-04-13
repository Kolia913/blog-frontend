import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PostModel} from '../model/post.model';
import {Observable} from 'rxjs';

@Injectable()
export class PostService {
  baseUrl = 'http://localhost:3000/api/';
  posts: PostModel[];
  filteredPosts: PostModel[];
  constructor(private readonly http: HttpClient) {
    this.http.get<PostModel[]>(`${this.baseUrl}posts`).subscribe(items => {
        this.posts = items.slice().sort((a, b) =>  new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        this.filteredPosts = this.posts
    });
  }
  searchPosts(filter: string): PostModel[] {
    this.filteredPosts = this.posts.slice().filter(value => {
        return value.title.trim().toLowerCase().includes(filter.trim().toLowerCase());
      })
    return this.filteredPosts
  }
  get(slug: string): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.baseUrl}posts/${slug}`);
  }
  getByCategory(categorySlug: string): void {
    this.http.get<PostModel[]>(`${this.baseUrl}posts/category/${categorySlug}`).subscribe(items => this.filteredPosts = items);
  }
  getCurrentUserPosts(id: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.baseUrl}posts/author/${id}`);
  }
  add(data: FormData): Observable<PostModel> {
    return this.http.post<PostModel>(`${this.baseUrl}posts/add`, data, {
      headers: new HttpHeaders({
        'auth-token': localStorage.getItem('access-token')
      })
    });
  }
  edit(slug: string, data: FormData): Observable<PostModel> {
    return this.http.put<PostModel>(`${this.baseUrl}posts/edit/${slug}`, data, {
      headers: new HttpHeaders({
        'auth-token': localStorage.getItem('access-token')
      })
    });
  }
  remove(slug: string): Observable<PostModel> {
    return this.http.delete<PostModel>(`${this.baseUrl}posts/delete/${slug}`, {
      headers: new HttpHeaders({
        'auth-token': localStorage.getItem('access-token')
      })
    });
  }
}
