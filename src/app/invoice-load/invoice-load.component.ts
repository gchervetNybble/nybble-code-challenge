import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IInvoice } from '../dto/invoice.interface';
import { InvoiceService } from '../service/invoiceService/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-load',
  templateUrl: './invoice-load.component.html',
  styleUrls: ['./invoice-load.component.css']
})
export class InvoiceLoadComponent implements OnInit {

  public invoices: IInvoice[];
  public taxPercentageValues = [0, 10.5, 21, 27];

  public dynamicForm = new FormGroup({
    invoiceNumber: new FormControl(''),
    net: new FormControl(),
    taxPercentage: new FormControl(0)
  });

  constructor(private invoiceService: InvoiceService, private router: Router) {
    invoiceService.dailyDataSubject.subscribe((nextValue: IInvoice[]) => {
      this.invoices = nextValue;
   });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.dynamicForm.invalid) {
      return;
    }
    this.invoiceService.add(this.dynamicForm.value);
    this.dynamicForm.reset();
  }

  remove(id: number) {
    this.invoiceService.remove(id);
  }

  processAndContinue() {
    // SUM DAILY AND HISTORY
    this.invoiceService.mergeData();
    this.router.navigate(['/history']);
  }
}
