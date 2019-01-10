import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  disabled = false;

  showBlock = false;

  constructor() {}

  ngOnInit() {}

  start() {
    this.showBlock = true;
    this.disabled = true;
  }

  reset() {
    this.showBlock = false;
    this.disabled = false;
  }
}
