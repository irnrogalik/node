import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxComponent } from './add-tax.component';

describe('AddTaxComponent', () => {
  let component: AddTaxComponent;
  let fixture: ComponentFixture<AddTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
