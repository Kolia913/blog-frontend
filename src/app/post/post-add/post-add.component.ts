import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../category/common/service/category.service';
import {PostFormService} from '../common/service/post-form.service';
import {TokenModel} from '../../common/model/token.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {PostModel} from '../common/model/post.model';
import {PostService} from '../common/service/post.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {FormDataService} from '../../form-data/common/service/form-data.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit, OnDestroy {
  errors: string;
  addPost: FormGroup;
  imageUrl: string;
  helper = new JwtHelperService();
  constructor(readonly categoryService: CategoryService,
              private readonly postFormService: PostFormService,
              private readonly postService: PostService,
              private readonly router: Router,
              private readonly formDataService: FormDataService) {
    this.addPost = this.postFormService.postForm
    this.addPost.addControl('image', new FormControl(null, [Validators.required]))
  }

  ngOnInit(): void {
  }

  submit(): void {
   if (!this.postFormService.isValid()) {
     if ( this.addPost.get('image').invalid) {
       this.errors = 'Image is invalid'
       return
     }
     this.errors = this.postFormService.errors
     return
   }
   const token: TokenModel = this.helper.decodeToken(localStorage.getItem('access-token'));
   const data = this.formDataService.formGroupToFormData(this.addPost)
   data.append('authorId', token._id)
   this.postService.add(data).subscribe(item => {
      if ( item ) {
        this.addPost.reset()
        this.router.navigate(['/posts', item.slug]).catch(err => console.log(err));
      }
    },
      err => {
      this.errors = err.error;
      });
  }

  async changeImage($event: File) {
    console.log($event);
    this.addPost.patchValue({
      image: $event,
    });
  }
  ngOnDestroy(): void {
    this.addPost.reset()
  }
}
