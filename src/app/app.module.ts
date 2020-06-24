import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LatticeTableComponent } from './lattice-table/lattice-table.component';
import { LatticeSheetComponent } from './lattice-sheet/lattice-sheet.component';

@NgModule({
  declarations: [AppComponent, LatticeTableComponent, LatticeSheetComponent],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
