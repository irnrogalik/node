import { ResponseServer } from 'src/app/interfaces/ResponseServer';
import { MyValidationErrors } from './../../interfaces/MyValidationErrors';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../interfaces/Category';
import { Product } from '../../interfaces/Product';
import { ProductService } from './../../services/product.service';
import { Location } from '@angular/common';
import { ValidationErrorsService } from 'src/app/services/validation-errors.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [ './add-product.component.css' ]
})

export class AddProductComponent implements OnInit {

  products: Product[];
  categories: Category[];
  addProductForm: FormGroup;
  errors: MyValidationErrors;
  response: ResponseServer;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private location: Location,
    private validationErrorsService: ValidationErrorsService
  ) { }

  ngOnInit() {
    this.getCategoryForProduct();
    this.addProductForm = this.formBuilder.group({
      name: [ '', [ Validators.required, Validators.maxLength(70) ] ],
      amount: [ '', Validators.required ],
      categories: [ [] ],
    });
  }

  onSubmit() {
    this.errors = {};
    if (this.addProductForm.invalid) {
      this.errors = this.validationErrorsService.getErrors(this.addProductForm);
    } else {
      this.addProduct(this.addProductForm.value);
    }
  }

  getCategoryForProduct(): void {
    this.productService.getCategoryForProduct().subscribe(
      categories => this.categories = categories
    );
  }

  addProduct(newProduct: Product): void {
    this.productService.addProduct(newProduct).subscribe((response: ResponseServer) => {
      this.response = response;
      if (response.status === 200) {
        this.addProductForm.reset();
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
