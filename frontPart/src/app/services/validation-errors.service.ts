import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyValidationErrors } from '../interfaces/MyValidationErrors';

@Injectable({
  providedIn: 'root'
})

export class ValidationErrorsService {

  errors: MyValidationErrors = {};

  constructor() { }

  getErrors(form: FormGroup): MyValidationErrors {
    for (const key of Object.keys(form.controls)) {
      const control = form.controls[ key ];
      if (control.errors) {
        this.errors[ key ] = control.errors;
        this.errors[ key ].key = key;
      }
    }
    return this.errors;
  }

}
