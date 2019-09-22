import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

export interface DataDates {
  id: number;
  time: Date;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  dateWhenAllStarted: Date;
  datesForProcessesCompletion: DataDates[] = new Array<DataDates>();
  ids = new Array();
  times:number[] = new Array<number>();
  constructor(private router: Router) { }

  ngOnInit() {
    if( !localStorage.getItem("dates") ){
      this.router.navigate(['picker'])
    }
    this.datesForProcessesCompletion = JSON.parse(localStorage.getItem("dates"));
    this.dateWhenAllStarted = new Date(JSON.parse(localStorage.getItem("date")));
    localStorage.clear();
    this.datesForProcessesCompletion.forEach(element => {
      this.ids.push("ID:" + (element.id+1));
      this.times.push( Math.round(this.dateWhenAllStarted.getMilliseconds()/new Date(element.time).getMilliseconds() * 10000) / 10000 );
    })
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.ids,
        datasets: [
          {
            data: this.times,
            borderColor: '#f44336',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  
}
