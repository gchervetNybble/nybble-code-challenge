import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IInvoice } from '../dto/invoice.interface';
import { InvoiceService } from '../service/invoiceService/invoice.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InvoiceLoadComponent } from './invoice-load.component';

describe('InvoiceLoadComponent', () => {
  let component: InvoiceLoadComponent;
  let fixture: ComponentFixture<InvoiceLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceLoadComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
     ],
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
