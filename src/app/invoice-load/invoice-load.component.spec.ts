import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceLoadComponent } from './invoice-load.component';

describe('InvoiceLoadComponent', () => {
  let component: InvoiceLoadComponent;
  let fixture: ComponentFixture<InvoiceLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
