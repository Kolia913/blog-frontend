import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../common/model/post.model';
import {CategoryService} from '../../category/common/service/category.service';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: PostModel
  categoryName: string;
  categoryColor: string;
  constructor(private readonly categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.get(this.post.categorySlug).subscribe(item => {
      this.categoryName = item.title
      this.categoryColor = item.color
    })
  }
}
