import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatticeSheetComponent } from './lattice-sheet/lattice-sheet.component';


const routes: Routes = [
  { path: 'first', component: LatticeSheetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
