import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { dragMockData } from './mock';
import lodash from 'lodash';

const _ = lodash;

export interface ItemInfo {
    metric_info?: any;
    key?: string;
    name?: string;
    type?: number;
    chart_type?: number;
    settings?: any;
    field_func?: any;
    config_keys: any[];
}
@Component({
    selector: 'cdk-drag-drop',
    templateUrl: './drag-drop.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CdkDragAndDropComponent implements OnInit, OnDestroy {
    private ngUnsubscribe$ = new Subject();

    dragData = dragMockData;

    selectedData = [
        {
            name: '工作项数量',
            key: 'count',
            type: 991,
            unit: '个'
        },
        {
            name: '需求吞吐量',
            key: 'demand_throughput',
            type: 991,
            unit: '个'
        }
    ];

    constructor(private renderer: Renderer2) {}

    drop(event: CdkDragDrop<ItemInfo[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    /** Predicate function that only allows even numbers to be dropped into a list. */
    evenPredicateDim = (item: CdkDrag<ItemInfo>) => {
        return !_.find(this.selectedData, { key: item.data.key }) && this.selectedData.length < 3;
    };

    /** Predicate function that doesn't allow items to be dropped into a list. */
    noReturnPredicate() {
        return false;
    }

    dragStarted(event: CdkDragStart, key?: string) {
        const id = 'even';
        if (this.selectedData.length === 3) {
            const receivingDom = document.getElementById(id);
            this.renderer.addClass(receivingDom, 'cdk-drop-list-receiving-disabled');
        }
    }

    dragEnded(event: CdkDragEnd, key?: string) {
        const id = 'even';
        const receivingDom = document.getElementById(id);
        this.renderer.removeClass(receivingDom, 'cdk-drop-list-receiving-disabled');
    }

    ngOnInit(): void {
        console.log(this.dragData);
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
