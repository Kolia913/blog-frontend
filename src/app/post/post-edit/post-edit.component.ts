import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../common/service/post.service';
import {CategoryService} from '../../category/common/service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostModel} from '../common/model/post.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenModel} from '../../common/model/token.model';
import {PostFormService} from '../common/service/post-form.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  editPost: FormGroup;
  imageUrl: string;
  errors: string;
  slug: string;
  helper =  new JwtHelperService()
  constructor(private readonly postService: PostService,
              readonly categoryService: CategoryService,
              private readonly  route: ActivatedRoute,
              private readonly router: Router,
              readonly postFormService: PostFormService) {
    this.editPost = this.postFormService.createForm()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.slug = params.get('slug')
      this.postService.get(this.slug).subscribe( item => {
        this.editPost.patchValue({
          title: item.title,
          description: item.description,
          content: item.content,
          category: item.categorySlug,
          imageUrl: item.imageUrl
        })
      })
    })
    this.editPost.get('imageUrl').valueChanges.subscribe(value => {
      if (value === '') {
        this.imageUrl = '../../../assets/placeholder-img-3.jpg'
        return
      }
      this.imageUrl = value.toString()
    })
  }
  submit(): void {
    if (this.editPost.invalid) {
      if (this.editPost.get('title').invalid) {
        this.errors = 'Title is invalid'
        return
      }
      if (this.editPost.get('description').invalid) {
        this.errors = 'Description is invalid (max length is 255)'
        return
      }
      if (this.editPost.get('content').invalid) {
        this.errors = 'Content is invalid (min length is 6)'
        return
      }
      if (this.editPost.get('category').invalid) {
        this.errors = 'Invalid category'
        return
      }
      if (this.editPost.get('imageUrl').invalid) {
        this.errors = 'Image url is invalid'
        return
      }
      return
    }
    const token: TokenModel = this.helper.decodeToken(localStorage.getItem('access-token'))
    const post: PostModel = {
      authorId: token._id,
      categorySlug: this.editPost.get('category').value,
      content: this.editPost.get('content').value,
      description: this.editPost.get('description').value,
      imageUrl: this.editPost.get('imageUrl').value,
      title: this.editPost.get('title').value
    }
    this.postService.edit(this.slug, post).subscribe(item => {
      if ( item ) {
         this.router.navigate(['/dashboard']).catch(err => console.log(err))
      }
    }, err => this.errors = err.error)
  }
}
