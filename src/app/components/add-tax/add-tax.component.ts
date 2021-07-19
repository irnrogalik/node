import { ResponseServer } from './../../interfaces/ResponseServer';
import { MyValidationErrors } from './../../interfaces/MyValidationErrors';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxService } from '../../services/tax.service';
import { Tax } from 'src/app/interfaces/Tax';
import { ValidationErrorsService } from 'src/app/services/validation-errors.service';

@Component({
  selector: 'app-add-tax',
  templateUrl: './add-tax.component.html',
  styleUrls: [ './add-tax.component.css' ]
})

export class AddTaxComponent implements OnInit {

  errors: MyValidationErrors;
  addTaxForm: FormGroup;
  response: ResponseServer;

  constructor(
    private taxService: TaxService,
    private formBuilder: FormBuilder,
    private location: Location,
    private validationErrorsService: ValidationErrorsService
  ) { }

  ngOnInit() {
    this.addTaxForm = this.formBuilder.group({
      name: [ '', [ Validators.required, Validators.maxLength(15) ] ],
      value: [ '', [ Validators.required, Validators.min(1), Validators.max(100) ] ],
      description: [ '', Validators.maxLength(50) ],
    });
  }

  onSubmit() {
    this.errors = {};
    if (this.addTaxForm.invalid) {
      this.errors = this.validationErrorsService.getErrors(this.addTaxForm);
    } else {
      this.addTax(this.addTaxForm.value);
    }
  }

  addTax(newTax: Tax): void {
    this.taxService.addTax(newTax).subscribe(
      (response: ResponseServer) => {
        this.response = response;
        if (response.status === 200) {
          this.addTaxForm.reset();
        }
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

}
