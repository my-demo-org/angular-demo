import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'app-init',
    templateUrl: './init.component.html',
    styleUrls: ['./init.component.scss'],
})
export class InitComponent implements OnInit {
    @HostBinding('class') hostClass = 'app-init';

    key = 'cdk-overlay';

    constructor() {}

    ngOnInit() {}

    change(key: string) {
        this.key = key;
    }
}
