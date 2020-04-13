import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class PostFormService {
  postForm: FormGroup
  errors: string
  constructor(private readonly fb: FormBuilder) {
    this.postForm =  this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
      description: new FormControl('', [Validators.maxLength(255)]),
      content: new FormControl('', [Validators.minLength(6)]),
      categorySlug: new FormControl('', [Validators.required]),
      // image: new FormControl(null, [Validators.required]) will added dynamically
    })
  }
  isValid(): boolean {
    if (this.postForm.invalid) {
      if ( this.postForm.get('title').invalid) {
        this.errors = 'Title is invalid';
        return false
      }
      if ( this.postForm.get('description').invalid) {
        this.errors = 'Description is invalid (max length is 255)';
        return false
      }
      if ( this.postForm.get('content').invalid) {
        this.errors = 'Content is invalid (min length is 6)';
        return false
      }
      if ( this.postForm.get('categorySlug').invalid) {
        this.errors = 'Invalid category';
        return false
      }
      return false
    }
    return true
  }
}
