import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../common/service/post.service';
import {CategoryService} from '../../category/common/service/category.service';
import {ActivatedRoute} from '@angular/router';
import {PostModel} from '../common/model/post.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {PostFormService} from '../common/service/post-form.service';
import {Location} from '@angular/common';
import {FormDataService} from '../../form-data/common/service/form-data.service';
import {ImageService} from '../../image/common/service/image.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit, OnDestroy {
  editPost: FormGroup;
  imageUrl: string;
  errors: string;
  slug: string;
  helper =  new JwtHelperService()
  constructor(private readonly postService: PostService,
              readonly categoryService: CategoryService,
              private readonly  route: ActivatedRoute,
              private readonly location: Location,
              readonly postFormService: PostFormService,
              private readonly formDataService: FormDataService) {
    this.editPost = this.postFormService.postForm
    this.editPost.addControl('image', new FormControl(null))
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.slug = params.get('slug')
      this.postService.get(this.slug).subscribe( item => {
        this.imageUrl = item.image.toString()
        this.editPost.patchValue({
          title: item.title,
          description: item.description,
          content: item.content,
          categorySlug: item.categorySlug,
        })
      })
    })
  }
  async submit(): Promise<void> {
    if (!this.postFormService.isValid()) {
      this.errors = this.postFormService.errors
      return
    }
    const data = this.formDataService.formGroupToFormData(this.editPost)
    await this.postService.edit(this.slug, data).subscribe(item => {
      if ( item ) {
          this.editPost.reset()
          this.location.back()
      }
    }, err => this.errors = err.error)
  }

  async changeImage($event: File) {
    this.editPost.patchValue({
      image: $event,
    });
  }
  ngOnDestroy(): void {
    this.editPost.reset()
  }
}
