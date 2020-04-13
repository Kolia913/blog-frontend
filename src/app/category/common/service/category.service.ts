import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CategoryModel} from '../model/category.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class CategoryService {
  categories: CategoryModel[]
  baseUrl: string = 'http://localhost:3000/api/'

  constructor(private readonly http: HttpClient) {
    this.http.get<CategoryModel[]>(`${this.baseUrl}categories`).subscribe(items => this.categories = items)
  }

  get(slug: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${this.baseUrl}categories/${slug}`)
  }

  add(data: FormData): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(`${this.baseUrl}categories/add`, data, {
      headers: new HttpHeaders({
        'auth-token': localStorage.getItem('access-token')
      })
    }).pipe(
      tap(item => this.categories.push(item))
    )
  }
  edit(slug: string, data: FormData): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.baseUrl}categories/edit/${slug}`, data, {
      headers: new HttpHeaders({
        'auth-token': localStorage.getItem('access-token')
      })
    }).pipe(
      tap(categoryItem => {
        const updatedIndex = this.categories.findIndex(item => item.slug === categoryItem.slug)
        if (updatedIndex < 0) {
          return categoryItem
        }
        this.categories[updatedIndex] = categoryItem
        return categoryItem
      })
    )
  }
  remove(slug: string): Observable<CategoryModel> {
    return this.http.delete<CategoryModel>(`${this.baseUrl}categories/delete/${slug}`, {
      headers: new HttpHeaders({
        'auth-token': localStorage.getItem('access-token')
      })
    })
  }
}
