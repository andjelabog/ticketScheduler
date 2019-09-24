import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PickerComponent } from './picker/picker.component';
import { AngularMaterialModule } from '../core/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimulationComponent } from './simulation/simulation.component';

@NgModule({
  declarations: [
    AppComponent,
    PickerComponent,
    SimulationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
