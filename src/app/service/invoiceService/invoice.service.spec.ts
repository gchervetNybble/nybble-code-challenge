import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { invoiceData } from '../../../assets/invoiceData';

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { InvoiceService } from './invoice.service';
import { IInvoice } from 'src/app/dto/invoice.interface';

const DAILY_STORAGE_KEY = 'daily_invoice_data';
const HISTORY_STORAGE_KEY = 'history_invoice_data';

const invoiceMock: IInvoice = { net: 1000, invoiceNumber: 'A0001-0000001', taxPercentage: 10.5, id: 0 };

describe('InvoiceService', () => {

  let service: InvoiceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
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
    service = new InvoiceService();
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    // This basically means: whenever localStorage.getItem is called,
    // instead, call mockLocalStorage.getItem with the same arguments, and so on.
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

  });

  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return mock base from localStorage (invoice history)',
    () => {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(invoiceData));
      expect(service.getAll()).toEqual(invoiceData);
  });

  it('should add correctly a new daily invoice (invoice daily)',
    () => {
      service.add(invoiceMock);
      const expectedResult = [invoiceMock];
      expect(service.getDaily()).toEqual(expectedResult);
  });

  it('should remove correctly a daily invoice by id (invoice daily)',
    () => {
      service.add(invoiceMock);
      const dailyInvoices = service.getDaily();
      service.remove(dailyInvoices[0].id);
      expect(service.getDaily()).toEqual([]);
  });

  it('should merge all data in local storage, daily and history',
    () => {
      service.add(invoiceMock);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(invoiceData));
      service.mergeData();

      invoiceMock.id = 9;
      invoiceData.push(invoiceMock);
      jasmine.clock().tick(10000);

      expect(service.getAll()).toEqual(invoiceData);
  });

  it('should clean daily local storage after merging daily and history',
    () => {
      service.add(invoiceMock);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(invoiceData));
      invoiceData.push(invoiceMock);

      service.mergeData();
      expect(service.getDaily()).toEqual([]);
  });

  it('should clean daily local storage after merging daily and history',
    () => {
      service.processData(invoiceMock);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(invoiceData));
      invoiceData.push(invoiceMock);

      service.mergeData();
      expect(service.getDaily()).toEqual([]);
  });

});
