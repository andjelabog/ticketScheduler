import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Process scheduler';
  color = 'warn';
  mode = 'indeterminate';
  isLoading: boolean = false;

  constructor(private router: Router) { }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ngOnInit(): Promise<void> {
    await this.delay(5000);
    this.isLoading = true;
    this.router.navigate(['picker']);
  }
}
