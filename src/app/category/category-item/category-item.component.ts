import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from '../common/model/category.model';
import {PostService} from '../../post/common/service/post.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styles: []
})
export class CategoryItemComponent implements OnInit, AfterViewInit {
  @Input() category: CategoryModel
  constructor(private readonly postService: PostService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Set category color
    // (document.querySelector('.category-link') as HTMLElement).style.color = this.category.color
  }
  findByCategory(slug: string) {
    this.postService.getByCategory(slug)
  }

}
