import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { invoiceData } from '../../../assets/invoiceData';

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { InvoiceService } from './invoice.service';

const DAILY_STORAGE_KEY = 'daily_invoice_data';
const HISTORY_STORAGE_KEY = 'history_invoice_data';

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

  const hola = 2;
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return mock base from localStorage (invoice history)',
    () => {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(invoiceData));
      expect(service.getAll()).toEqual(invoiceData);
  });

});
