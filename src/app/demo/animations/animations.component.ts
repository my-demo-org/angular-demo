import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
  animations: [
    state(
      'open',
      style({ height: '200px', opacity: 1, backgroundColor: 'yellow' })
    ),
    state(
      'closed',
      style({ height: '100px', opacity: 0.5, backgroundColor: 'green' })
    ),
    transition('open => closed', [animate('1s')])
  ]
})
export class AnimationsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
