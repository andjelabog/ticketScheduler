import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private router: Router) { }

  // sleep(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  ngOnInit() {
    // await this.sleep(5000);
    // this.isLoading = true;
    this.router.navigate(['picker']);
  }
}
