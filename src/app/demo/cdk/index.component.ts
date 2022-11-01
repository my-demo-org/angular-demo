import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cdk-demo',
    templateUrl: 'index.component.html',
})
export class AppCdkDemoComponent {
    @Input() key: string;

    constructor() {}
}
