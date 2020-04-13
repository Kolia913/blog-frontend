import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../common/service/category.service';
import {Router} from '@angular/router';
import validate = WebAssembly.validate;
import {CategoryModel} from '../common/model/category.model';
import {CategoryFormService} from '../common/service/category-form.service';
import {FormDataService} from '../../form-data/common/service/form-data.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit, OnDestroy {
  categoryAdd: FormGroup;
  color: string;
  error: string;
  constructor(private readonly categoryService: CategoryService,
              private readonly router: Router,
              private readonly categoryFormService: CategoryFormService,
              private readonly formDataService: FormDataService) {
    this.categoryAdd = this.categoryFormService.categoryForm
  }

  ngOnInit(): void {
    this.categoryAdd.get('color').valueChanges.subscribe(value => {
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
    const data = this.formDataService.formGroupToFormData(this.categoryAdd)
    this.categoryService.add(data).subscribe(item => {
      this.categoryAdd.reset()
      this.router.navigate(['/admin/categories']).catch(err => console.log(err))
    },
      err => {
      alert(err.error)
      })
  }
  ngOnDestroy(): void {
    this.categoryAdd.reset()
  }
}
