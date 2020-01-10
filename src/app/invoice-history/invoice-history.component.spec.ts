import { Component, OnInit } from '@angular/core';
import { IInvoice } from '../dto/invoice.interface';
import { InvoiceService } from '../service/invoiceService/invoice.service';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { InvoiceHistoryComponent } from './invoice-history.component';

describe('InvoiceHistoryComponent', () => {
  let component: InvoiceHistoryComponent;
  let fixture: ComponentFixture<InvoiceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceHistoryComponent ],
      imports: [
        RouterTestingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
