import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../common/service/category.service';
import {CategoryModel} from '../common/model/category.model';
import {CategoryFormService} from '../common/service/category-form.service';
import {FormDataService} from '../../form-data/common/service/form-data.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  categoryEdit: FormGroup;
  color: string;
  error: string;
  slug: string;
  constructor(private readonly categoryFormService: CategoryFormService,
              private readonly route: ActivatedRoute,
              private readonly categoryService: CategoryService,
              private readonly router: Router,
              private readonly formDataService: FormDataService) {
    this.categoryEdit = this.categoryFormService.categoryForm
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug')
      this.categoryService.get(this.slug).subscribe(category => {
        this.categoryEdit.patchValue({
          title: category.title,
          color: category.color,
          description: category.description
        })
      })
    })
    this.categoryEdit.get('color').valueChanges.subscribe(value => {
      if (!value) {
        this.error = `Invalid color`
      }
      this.color = value
    })
  }

  submit(): void {
    if (!this.categoryFormService.isValid()) {
      this.error = this.categoryFormService.error
      alert(this.error)
      return
    }
    const data = this.formDataService.formGroupToFormData(this.categoryEdit)
    this.categoryService.edit(this.slug, data).subscribe(item => {
        this.categoryEdit.reset()
        this.router.navigate(['/admin/categories']).catch(err => console.log(err))
      },
        err => {
          this.error = err.error
        })
  }
  ngOnDestroy(): void {
    this.categoryEdit.reset()
  }
}
