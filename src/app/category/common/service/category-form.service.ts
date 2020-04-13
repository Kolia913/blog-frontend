import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class CategoryFormService {
  categoryForm: FormGroup
  error: string
  constructor(private readonly fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      color: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(255)])
    })
  }
  isValid(): boolean {
    if (this.categoryForm.invalid) {
      if (this.categoryForm.get('title').invalid) {
        this.error = `Title is invalid`
        return false
      }
      if (this.categoryForm.get('color').invalid) {
        this.error = `Color is invalid`
        return false
      }
      if (this.categoryForm.get('description').invalid) {
        this.error = `Description is invalid`
        return false
      }
      return false
    }
    return true
}
}
