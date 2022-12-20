import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'cdk-drag-drop',
    templateUrl: './drag-drop.component.html',
    styleUrls: ['./drag-drop.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CdkDragAndDropComponent implements OnInit, OnDestroy {
    private ngUnsubscribe$ = new Subject();

    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
