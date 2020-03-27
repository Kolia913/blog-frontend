import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../common/model/post.model';
import {CategoryService} from '../../category/common/service/category.service';
import {PostService} from '../common/service/post.service';

@Component({
  selector: 'app-user-post-item',
  templateUrl: './user-post-item.component.html',
  styleUrls: ['./user-post-item.component.css']
})
export class UserPostItemComponent implements OnInit {
  @Input() post: PostModel
  categoryName: string
  categoryColor: string
  constructor(private readonly categoryService: CategoryService,
              private readonly postService: PostService) { }

  ngOnInit(): void {
    this.categoryService.get(this.post.categorySlug).subscribe(item => {
      this.categoryName = item.title
      this.categoryColor = item.color
    })
  }

  removePost(): void {
    const title: string = prompt('Enter post title')
    if (title.trim().toLowerCase().replace(/\s/g, '') !==
      this.post.title.trim().toLowerCase().replace(/\s/g, '')) {
      alert('Title does not match!')
      return
    }
    this.postService.remove(this.post.slug).subscribe( item => {
      alert('Deleted post:' + item.title)
      window.location.reload()
    },
      err => {
      alert(err.toString())
      })
  }
}
