import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: '<div class="header">Welcome to my angular demo!</div>',
  styles: [
    `
      .header {
        width: 100vw;
        height: 50px;
        border-bottom: 1px solid #eee;
        padding-left:20px;
        line-height:50px;
      }
    `
  ]
})
export class AppHeaderComponent {
  constructor() {}
}
