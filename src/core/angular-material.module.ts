import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    MatInputModule,
    MatSliderModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule
  ],
  exports: [
    MatInputModule,
    MatSliderModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule

  ]

})
export class AngularMaterialModule { }