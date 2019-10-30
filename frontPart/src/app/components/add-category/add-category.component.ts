import { ResponseServer } from './../../interfaces/ResponseServer';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tax } from '../../interfaces/Tax';
import { CategoryService } from '../../services/category.service';
import { MyValidationErrors } from './../../interfaces/MyValidationErrors';
import { ValidationErrorsService } from 'src/app/services/validation-errors.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: [ './add-category.component.css' ]
})

export class AddCategoryComponent implements OnInit {

  taxes: Tax[];
  addCategoryForm: FormGroup;
  errors: MyValidationErrors;
  response: ResponseServer;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private location: Location,
    private validationErrorsService: ValidationErrorsService
  ) { }

  ngOnInit() {
    this.getTaxForCategory();
    this.addCategoryForm = this.formBuilder.group({
      name: [ '', [ Validators.required, Validators.maxLength(50) ] ],
      taxId: [ null ],
    });
  }

  onSubmit(): void {
    this.errors = {};
    if (this.addCategoryForm.invalid) {
      this.errors = this.validationErrorsService.getErrors(this.addCategoryForm);
    } else {
      this.addCategory(this.addCategoryForm.value);
    }
  }

  getTaxForCategory(): void {
    this.categoryService.getTaxForCategory().subscribe(
      taxes => this.taxes = taxes
    );
  }

  addCategory(newCategory: { name: string, taxId: number }): void {
    this.categoryService.addCategory(newCategory).subscribe((response: ResponseServer) => {
      this.response = response;
      if (response.status === 200) {
        this.addCategoryForm.reset();
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
