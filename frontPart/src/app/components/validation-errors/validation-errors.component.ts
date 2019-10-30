import { MyValidationErrors, MyValidationErrorsForTemplate } from './../../interfaces/MyValidationErrors';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: [ './validation-errors.component.css' ]
})

export class ValidationErrorsComponent implements OnInit {

  @Input() errors: MyValidationErrorsForTemplate;

  constructor() { }

  ngOnInit() {

  }

}
