import { TestBed } from '@angular/core/testing';

import { ValidationErrorsService } from './validation-errors.service';

describe('ValidationErrorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationErrorsService = TestBed.get(ValidationErrorsService);
    expect(service).toBeTruthy();
  });
});
