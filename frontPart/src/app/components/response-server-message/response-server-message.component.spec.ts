import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseServerMessageComponent } from './response-server-message.component';

describe('ResponseServerMessageComponent', () => {
  let component: ResponseServerMessageComponent;
  let fixture: ComponentFixture<ResponseServerMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseServerMessageComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseServerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
