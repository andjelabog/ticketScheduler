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
  chosenTicketNumber : number = -1;
  constructor() { }

  initProcesses() {
    for (let i = 0; i < this.numberOfProcesses; i++) {
      let process: Process = {
        id: i,
        priority: Math.floor(1 + Math.random() * this.numberOfProcesses),                      // Poslati iz picker.component
        burstTime: Math.floor(1 + Math.random() * 10),                                         // Poslati iz picker.component
        tickets: [] = []
      }
      let ticketForSelectedProcess = Math.floor(Math.random() * 10)
      for (let j = 0; j < ticketForSelectedProcess; j++) {
        process.tickets[j] = Math.floor(Math.random() * 100);
      }
      this.arrayOfProcesses.push(process);
    }
  }

  sortProcessesByPriority() {
    this.arrayOfProcesses.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.burstTime - b.burstTime;
      }
      return a.priority > b.priority ? 1 : -1;
    })
  }

  findProcessToExecute(ticketNumber: number) {
    for (let i = 0; i < this.numberOfProcesses; i++) {
      for (let j = 0; j < this.arrayOfProcesses[i].tickets.length; j++) {
        if (this.arrayOfProcesses[i].tickets[j] == ticketNumber)
          return this.arrayOfProcesses[i].id;
      }
    }
  }

  getSchedulersTicketNumber(){
    this.chosenTicketNumber = Math.floor(Math.random() * 100);
  }

  ngOnInit() {
    this.initProcesses();
    this.sortProcessesByPriority();
  }

}
