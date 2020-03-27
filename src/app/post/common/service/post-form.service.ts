import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class PostFormService {
  constructor(private readonly fb: FormBuilder) {
  }
createForm(): FormGroup {
    return this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
      description: new FormControl('', [Validators.maxLength(255)]),
      content: new FormControl('', [Validators.minLength(6)]),
      category: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required])
    })
}
}
