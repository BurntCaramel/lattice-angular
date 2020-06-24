import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatticeTableComponent } from './lattice-table/lattice-table.component';


const routes: Routes = [
  { path: 'first', component: LatticeTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
