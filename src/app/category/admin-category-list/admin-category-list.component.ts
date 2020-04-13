import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../common/service/category.service';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.css']
})
export class AdminCategoryListComponent implements OnInit {

  constructor(readonly categoryService: CategoryService) { }

  ngOnInit(): void {
  }

}
