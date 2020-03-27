import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CategoryService} from '../../category/common/service/category.service';
import {PostFormService} from '../common/service/post-form.service';
import {TokenModel} from '../../common/model/token.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {PostModel} from '../common/model/post.model';
import {PostService} from '../common/service/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  errors: string;
  addPost: FormGroup;
  imageUrl: string;
  helper = new JwtHelperService()
  constructor(readonly categoryService: CategoryService,
              private readonly postFormService: PostFormService,
              private readonly postService: PostService,
              private readonly router: Router) {
    this.addPost = this.postFormService.createForm()
  }

  ngOnInit(): void {
    this.imageUrl = '../../../assets/placeholder-img-3.jpg'
    this.addPost.get('imageUrl').valueChanges.subscribe( value => {
      if (value === '') {
        this.imageUrl = '../../../assets/placeholder-img-3.jpg'
        return
      }
      this.imageUrl = value.toString()
    })
  }

  submit(): void {
   if (this.addPost.invalid) {
      if ( this.addPost.get('title').invalid) {
        this.errors = 'Title is invalid'
        return
      }
      if ( this.addPost.get('description').invalid) {
        this.errors = 'Description is invalid (max length is 255)'
        return
      }
      if ( this.addPost.get('content').invalid) {
        this.errors = 'Content is invalid (min length is 6)'
        return
      }
      if ( this.addPost.get('category').invalid) {
        this.errors = 'Invalid category'
        return
      }
      if ( this.addPost.get('imageUrl').invalid) {
        this.errors = 'Image url is invalid'
        return
      }
      return
    }
    const token: TokenModel = this.helper.decodeToken(localStorage.getItem('access-token'))
    const post: PostModel = {
      authorId: token._id,
      categorySlug:  this.addPost.get('category').value,
      content:  this.addPost.get('content').value,
      description:  this.addPost.get('description').value,
      imageUrl:  this.addPost.get('imageUrl').value,
      title:  this.addPost.get('title').value
    }
    this.postService.add(post).subscribe(item => {
      if ( item ) {
        this.router.navigate(['/posts', item.slug]).catch(err => console.log(err))
      }
    },
      err => {
      this.errors = err.error
      })
  }
}
