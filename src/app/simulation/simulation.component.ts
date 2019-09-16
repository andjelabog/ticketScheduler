import { Component, OnInit } from '@angular/core';

export interface Process {
  id: number;
  priority: number;
  burstTime: number;
  tickets: number[];
}
@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {

  numberOfProcesses: number = 18;
  arrayOfProcesses: Process[] = new Array<Process>();
  chosenTicketNumber: number = -1;
  chosenProcessToRun: Process = null;
  arrayOfTickets: number[] = [];
  finishedCounter: number = 0;
  sleepTime: number = 1000;
  displayedColumns: string[] = ['id', 'priority', 'burstTime', 'tickets'];

  constructor() { }

  initProcesses(): void {
    for (let i = 0; i < this.numberOfProcesses; i++) {
      let process: Process = {
        id: i,
        priority: Math.floor(1 + Math.random() * this.numberOfProcesses),
        burstTime: Math.floor(1 + Math.random() * 10),
        tickets: [] = []
      }
      let ticketForSelectedProcess = Math.floor(Math.random() * 10) + 1;
      for (let j = 0; j < ticketForSelectedProcess; j++) {
        let ticket = Math.floor(Math.random() * 100);
        process.tickets[j] = ticket;
        this.arrayOfTickets.push(ticket);
      }
      process.tickets.sort((a, b) => { return a - b });
      this.arrayOfProcesses.push(process);
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

        var randBurstTime = Math.floor(1 + Math.random() * 5)
        if (this.chosenProcessToRun.burstTime - randBurstTime <= 0)
          this.chosenProcessToRun.burstTime = 0;
        else
          this.chosenProcessToRun.burstTime -= randBurstTime;
        if (this.chosenProcessToRun.burstTime <= 0) {
          this.finishedCounter++;
        }
      }
      await this.sleep(this.sleepTime);
    }
  }

  ngOnInit() {
    if (!!localStorage.getItem("seconds")) {
      this.sleepTime = Number(localStorage.getItem("seconds")) * 1000;
    }
    if (!!localStorage.getItem("numberOfProcesses")) {
      this.numberOfProcesses = Number(localStorage.getItem("numberOfProcesses"));
    }
    this.initProcesses();
    this.sortProcessesByPriority();
    this.sortTickets();
    this.mainLoop();
  }

}
