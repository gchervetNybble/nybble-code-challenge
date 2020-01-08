import { Component, OnInit } from '@angular/core';
import { IInvoice } from '../dto/invoice.interface';
import { InvoiceService } from '../service/invoiceService/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.css']
})
export class InvoiceHistoryComponent implements OnInit {

  public page = 1;
  public pageSize = 10;
  public invoices: IInvoice[];

  constructor(private invoiceService: InvoiceService, private router: Router) {
    invoiceService.historyDataSubject.subscribe((nextValue: IInvoice[]) => {
      this.invoices = nextValue;
   });
  }

  ngOnInit() {
    this.invoices = this.invoiceService.getAll();
  }

  get invoicesPerPage(): IInvoice[] {
    return this.invoices.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  goBack() {
    this.router.navigate(['']);
  }

  remove(id: number) {
    this.invoiceService.remove(id, true);
  }

  removeAll(id: number) {
    this.invoiceService.removeAll();
  }
}
