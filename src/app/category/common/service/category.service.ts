import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../model/category.model';
import {Observable} from 'rxjs';

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
}
