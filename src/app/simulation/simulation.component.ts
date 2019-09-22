import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Process {
  id: number;
  priority: number;
  burstTime: number;
  tickets: number[];
}

export interface DataDates {
  id: number;
  time: Date;
}
@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {

  numberOfProcesses: number = 10;
  arrayOfProcesses: Process[] = new Array<Process>();
  chosenTicketNumber: number = -1;
  chosenProcessToRun: Process = null;
  arrayOfTickets: number[] = [];
  finishedCounter: number = 0;
  sleepTime: number = 1000;
  displayedColumns: string[] = ['id', 'priority', 'burstTime', 'tickets'];
  totalNumberOfTickets: number = 0;
  finishedMainLoop: boolean = false;
  dataSource: MatTableDataSource<Process>;


  dateWhenAllStarted: Date;
  datesForProcessesCompletion: DataDates[] = new Array<DataDates>();

  constructor(private router: Router) { }

  initProcesses(): void {
    for (let i = 0; i < this.numberOfProcesses; i++) {
      this.addNewProcess(i);
    }
    this.dataSource = new MatTableDataSource(this.arrayOfProcesses);
  }

  addNewProcess(i) {
    let flag = false;
    if (i == null) {
      flag = true;
      this.numberOfProcesses += 1;
      i = this.numberOfProcesses - 1;
    }
    let process: Process = {
      id: i,
      priority: Math.floor(1 + Math.random() * this.numberOfProcesses),
      burstTime: Math.floor(1 + Math.random() * 10),
      tickets: [] = []
    }
    let ticketForSelectedProcess = Math.floor(Math.random() * 10) + 1;
    this.totalNumberOfTickets += ticketForSelectedProcess;

    for (let j = 0; j < ticketForSelectedProcess; j++) {
      let ticket = Math.floor(Math.random() * this.numberOfProcesses * 10);

      //generate totally random ticket
      while (this.arrayOfTickets.indexOf(ticket) != -1)
        ticket = Math.floor(Math.random() * this.numberOfProcesses * 10);

      process.tickets[j] = ticket;
      this.arrayOfTickets.push(ticket);
    }
    process.tickets.sort((a, b) => { return a - b });
    this.arrayOfProcesses.push(process);
    this.dataSource = new MatTableDataSource(this.arrayOfProcesses);

    if (this.finishedCounter < this.numberOfProcesses && this.finishedMainLoop) {
      this.finishedMainLoop = false;
      this.mainLoop();
    }
  }

  sortProcessesByPriority(): void {
    this.arrayOfProcesses.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.burstTime - b.burstTime;
      }
      return a.priority > b.priority ? 1 : -1;
    })
  }

  sortTickets(): void {
    this.arrayOfTickets.sort((a, b) => { return a - b });
  }

  findProcessToExecute(ticketNumber: number) {
    for (let i = 0; i < this.numberOfProcesses; i++) {
      for (let j = 0; j < this.arrayOfProcesses[i].tickets.length; j++) {
        if (this.arrayOfProcesses[i].tickets[j] == ticketNumber && this.arrayOfProcesses[i].burstTime != 0)
          return this.arrayOfProcesses[i];
      }
    }
  }

  findRandomTicketNumber() {
    var ticket = this.arrayOfTickets[Math.floor(Math.random() * this.arrayOfTickets.length)];
    return ticket;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async mainLoop() {
    while (this.finishedCounter != this.numberOfProcesses) {
      this.chosenTicketNumber = this.findRandomTicketNumber();
      this.chosenProcessToRun = this.findProcessToExecute(this.chosenTicketNumber);
      if (!!this.chosenProcessToRun) {

        var randBurstTime = 2;// Math.floor(1 + Math.random() * this.chosenProcessToRun.burstTime);
        if (this.chosenProcessToRun.burstTime - randBurstTime <= 0)
          this.chosenProcessToRun.burstTime = 0;
        else
          this.chosenProcessToRun.burstTime -= randBurstTime;
        // Process has finished
        if (this.chosenProcessToRun.burstTime <= 0) {
          let dataDate: DataDates = {
            id: this.chosenProcessToRun.id,
            time: new Date()
          }
          this.datesForProcessesCompletion.push(dataDate);
          this.removeFinishedTickets();
          this.finishedCounter++;
        }
      }
      await this.sleep(this.sleepTime);
    }
    this.finishedMainLoop = true;
  }

  removeFinishedTickets(): void {
    let tickets = this.chosenProcessToRun.tickets;
    tickets.forEach(element => {
      let index = this.arrayOfTickets.indexOf(element);
      if (index != -1) {
        this.arrayOfTickets.splice(index, 1);
      }
    })
  }

  ngOnInit() {
    // if (!!localStorage.getItem("seconds")) {
    //   this.sleepTime = Number(localStorage.getItem("seconds")) * 1000;
    // }
    if (!!localStorage.getItem("numberOfProcesses")) {
      this.numberOfProcesses = Number(localStorage.getItem("numberOfProcesses"));
    }
    else{
      this.router.navigate(['picker'])
    }
    this.initProcesses();
    this.sortProcessesByPriority();
    this.sortTickets();
    this.dateWhenAllStarted = new Date();
    this.mainLoop();
  }

  rerouteToCharts() {
    this.datesForProcessesCompletion.sort( (a,b)=> {
      return a.id - b.id
    })
    localStorage.setItem("dates", JSON.stringify(this.datesForProcessesCompletion));
    localStorage.setItem("date", JSON.stringify(this.dateWhenAllStarted));
    this.router.navigate(['chart'])
  }
}
