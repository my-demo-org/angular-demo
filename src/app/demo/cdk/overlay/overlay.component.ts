import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'cdk-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
})
export class CdkOverlayComponent implements OnInit {
    @HostBinding('class') hostClass = 'cdk-overlay-wrapper';

    isOpen = false;

    constructor() {}

    ngOnInit(): void {}
}
