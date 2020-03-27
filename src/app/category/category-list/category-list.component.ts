import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../common/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styles: []
})
export class CategoryListComponent implements OnInit {

  constructor(readonly categoryService: CategoryService) { }

  ngOnInit(): void {
  }

}
