import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { dragMockData } from './mock';
import lodash from 'lodash';

const _ = lodash;

export interface ItemInfo {
    key?: string;
    name?: string;
    type?: number;
    unit?: string;
}
@Component({
    selector: 'cdk-drag-drop',
    templateUrl: './drag-drop.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CdkDragAndDropComponent implements OnInit, OnDestroy {
    private ngUnsubscribe$ = new Subject();

    dragData = dragMockData;

    selectedData: ItemInfo[] = [
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

    anotherSelectedData: ItemInfo[] = [
        {
            name: '工作项按期完成率',
            key: 'completed_percentage_on_time',
            type: 991,
            unit: '%'
        }
    ];

    constructor(private renderer: Renderer2) {}

    drop(event: CdkDragDrop<ItemInfo[]>, id: string) {
        if (event.previousContainer === event.container) {
            if (id === 'cols') {
                moveItemInArray(this.selectedData, event.previousIndex, event.currentIndex);
            }
            if (id === 'rows') {
                moveItemInArray(this.anotherSelectedData, event.previousIndex, event.currentIndex);
            }
            // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            let item = event.previousContainer.data[event.previousIndex] as ItemInfo;
            if (id === 'cols') {
                if (
                    _.some(this.selectedData, i => {
                        return i.key === item.key;
                    })
                ) {
                    return false;
                }

                if (this.selectedData.length < 3) {
                    this.selectedData.push(item);
                }
            }
            if (id === 'rows') {
                if (
                    _.some(this.anotherSelectedData, i => {
                        return i.key === item.key;
                    })
                ) {
                    return false;
                }

                this.anotherSelectedData.push(item);
            }

            // transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    /** Predicate function that only allows even numbers to be dropped into a list. */
    evenPredicate = (item: CdkDrag<ItemInfo>) => {
        return !_.find(this.selectedData, { key: item.data.key }) && this.selectedData.length < 3;
    };

    evenPredicateAnother = (item: CdkDrag<ItemInfo>) => {
        return !_.find(this.anotherSelectedData, { key: item.data.key });
    };

    /** Predicate function that doesn't allow items to be dropped into a list. */
    noReturnPredicate() {
        return false;
    }

    dragStarted(event: CdkDragStart, key?: string) {
        const id = 'cols';
        if (this.selectedData.length === 3) {
            const receivingDom = document.getElementById(id);
            this.renderer.addClass(receivingDom, 'cdk-drop-list-receiving-disabled');
        }
    }

    dragEnded(event: CdkDragEnd, key?: string) {
        const id = 'cols';
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
