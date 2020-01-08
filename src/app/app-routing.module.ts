import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InvoiceLoadComponent } from './invoice-load/invoice-load.component';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history.component';


const routes: Routes = [

  {
    path: 'load',
    component: InvoiceLoadComponent
  },
  {
    path: 'history',
    component: InvoiceHistoryComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
  {
    path: '',
    redirectTo: 'load',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
