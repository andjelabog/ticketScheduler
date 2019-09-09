import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pickerRoute } from './picker/picker.route';
import { simulationRoute } from './simulation/simulation.route';


const routes: Routes = [pickerRoute, simulationRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
