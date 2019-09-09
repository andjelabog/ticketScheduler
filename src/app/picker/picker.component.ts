import { Component, OnInit } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Router } from '@angular/router';


@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {
  max: number;
  min: number;
  step: number;
  thumbLabel: boolean;
  value: number;

  private _tickInterval = 1;
  get tickInterval(): number | 'auto' {
    return this._tickInterval;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  constructor(private router: Router) { }

  ngOnInit() {
    this.resetData();
  }

  resetData() {
    this.max = 100;
    this.min = 0;
    this.step = 1;
    this.thumbLabel = true;
    this.value = 0;
  }

  watchSimulation() {
    this.router.navigate(['simulation'])
  }
}
