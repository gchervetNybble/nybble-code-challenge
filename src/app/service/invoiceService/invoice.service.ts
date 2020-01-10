import { Injectable } from '@angular/core';
import { IInvoice } from '../../dto/invoice.interface';
import { Subject, BehaviorSubject } from 'rxjs';
import { invoiceData } from '../../../assets/invoiceData';

const DAILY_STORAGE_KEY = 'daily_invoice_data';
const HISTORY_STORAGE_KEY = 'history_invoice_data';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {

  dailyDataSubject = new BehaviorSubject([]);
  historyDataSubject = new BehaviorSubject([]);

  constructor() {
    this.processData(this.getDaily());
    this.processData(invoiceData, true);
  }

  getDaily(): IInvoice[] {
    return JSON.parse(localStorage.getItem(DAILY_STORAGE_KEY)) || [];
  }

  getAll(): IInvoice[] {
    return JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || [];
  }

  add(newInvoice: IInvoice): void {
    const actualInvoiceData = this.getDaily();

    if (actualInvoiceData.length) {
      newInvoice.id = Math.max.apply(Math, actualInvoiceData.map(function(o) { return o.id; })) + 1 || 0;
    } else {
      newInvoice.id = 1;
    }

    actualInvoiceData.push(newInvoice);
    this.processData(actualInvoiceData);
  }

  remove(id: number, removeFromHistory: boolean = false) {

    let actualInvoiceData: IInvoice[];

    if (!removeFromHistory) {
      actualInvoiceData = this.getDaily();
    } else {
      actualInvoiceData = this.getAll();
    }

    const indexToRemove = actualInvoiceData.findIndex(x => x.id === id);
    if (indexToRemove !== -1) {
      let removed = actualInvoiceData.splice(indexToRemove, 1);
    }

    this.processData(actualInvoiceData, removeFromHistory);
  }

  removeAll() {
    this.processData([], false);
    this.processData([], true);
  }

  processData(data: IInvoice[], removeFromHistory: boolean = false) {

    if (!removeFromHistory) {
      localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(data));
      this.dailyDataSubject.next(data);
    } else {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(data));
      this.historyDataSubject.next(data);
    }

  }

  mergeData() {
    const dailyInvoiceData = this.getDaily();
    const historyInvoiceData = this.getAll();

    let lastId = Math.max.apply(Math, historyInvoiceData.map(function(o) { return o.id; })) + 1 || 0;

    dailyInvoiceData.forEach(dailyInvoice => {
      dailyInvoice.id = lastId;
      historyInvoiceData.push(dailyInvoice);
      lastId++;
    });

    this.processData([], false);
    this.processData(historyInvoiceData, true);
  }
}
