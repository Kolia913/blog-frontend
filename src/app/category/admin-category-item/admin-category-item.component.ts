import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from '../common/model/category.model';
import {CategoryService} from '../common/service/category.service';

@Component({
  selector: 'app-admin-category-item',
  templateUrl: './admin-category-item.component.html',
  styleUrls: ['./admin-category-item.component.css']
})
export class AdminCategoryItemComponent implements OnInit {
  @Input() category: CategoryModel
  constructor(private readonly categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  removeCategory(): void {
    const title: string = prompt('Enter category name')
    if (title.trim().toLowerCase().replace(/\s/g, '') !==
      this.category.title.trim().toLowerCase().replace(/\s/g, '')) {
      alert('Name does not match!')
      return
    }
    this.categoryService.remove(this.category.slug).subscribe( item => {
        alert('Deleted category:' + item.title)
        window.location.reload()
      },
      err => {
        alert(err.toString())
      })
  }
}
