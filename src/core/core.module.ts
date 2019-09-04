import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';



@NgModule({
  declarations: [],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule
  ]
})
export class CoreModule { }
