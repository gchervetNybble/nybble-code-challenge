import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceLoadComponent } from './invoice-load/invoice-load.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OnlyNumber } from './directive/onlyNumbers.directive';
import { NoWhitespace } from './directive/noWhitespace.directive';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceLoadComponent,
    InvoiceHistoryComponent,
    OnlyNumber,
    NoWhitespace
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
