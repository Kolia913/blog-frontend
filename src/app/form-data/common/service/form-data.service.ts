import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormDataService {
  formGroupToFormData(formGroup: FormGroup): FormData {
    return this.objectToFormsData(formGroup.value);
  }

  objectToFormsData(input: {[k: string]: string | Blob}): FormData {
    const formData = new FormData();

    for (const key in input) {
      if (!input.hasOwnProperty(key) || !input[key]) {
        continue;
      }

      formData.append(key, input[key]);
    }

    return formData;
  }
}
