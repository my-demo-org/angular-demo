import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CdkScrollable, FixedSizeVirtualScrollStrategy, ScrollDispatcher, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
        super(50, 250, 500);
    }
}

@Component({
    selector: 'cdk-scrolling',
    templateUrl: './scrolling.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy }]
})
export class CdkScrollingComponent implements OnInit {
    options = [
        { _id: 1, text: '北京' },
        { _id: 2, text: '上海' },
        { _id: 3, text: '天津' },
        { _id: 4, text: '重庆' },
        { _id: 5, text: '山西' },
        { _id: 6, text: '陕西' },
        { _id: 7, text: '河北' },
        { _id: 8, text: '河南' },
        { _id: 9, text: '湖北' },
        { _id: 10, text: '湖南' },
        { _id: 11, text: '黑龙江' },
        { _id: 12, text: '吉林' },
        { _id: 13, text: '辽宁' },
        { _id: 14, text: '宁夏' },
        { _id: 15, text: '甘肃' },
        { _id: 16, text: '西藏' },
        { _id: 17, text: '新疆' },
        { _id: 18, text: '云南' },
        { _id: 19, text: '四川' },
        { _id: 20, text: '广东' },
        { _id: 21, text: '广西' },
        { _id: 22, text: '海南' },
        { _id: 23, text: '江西' },
        { _id: 24, text: '江苏' },
        { _id: 25, text: '浙江' },
        { _id: 26, text: '安徽' },
        { _id: 27, text: '福建' },
        { _id: 28, text: '贵州' },
        { _id: 29, text: '台湾' },
        { _id: 30, text: '澳门' },
        { _id: 31, text: '香港' },
        { _id: 32, text: '青海' },
        { _id: 33, text: '内蒙古' },
        { _id: 34, text: '山东' }
    ];

    states = [
        { name: 'Alabama', capital: 'Montgomery' },
        { name: 'Alaska', capital: 'Juneau' },
        { name: 'Arizona', capital: 'Phoenix' },
        { name: 'Arkansas', capital: 'Little Rock' },
        { name: 'California', capital: 'Sacramento' },
        { name: 'Colorado', capital: 'Denver' },
        { name: 'Connecticut', capital: 'Hartford' },
        { name: 'Delaware', capital: 'Dover' },
        { name: 'Florida', capital: 'Tallahassee' },
        { name: 'Georgia', capital: 'Atlanta' },
        { name: 'Hawaii', capital: 'Honolulu' },
        { name: 'Idaho', capital: 'Boise' },
        { name: 'Illinois', capital: 'Springfield' },
        { name: 'Indiana', capital: 'Indianapolis' },
        { name: 'Iowa', capital: 'Des Moines' },
        { name: 'Kansas', capital: 'Topeka' },
        { name: 'Kentucky', capital: 'Frankfort' },
        { name: 'Louisiana', capital: 'Baton Rouge' },
        { name: 'Maine', capital: 'Augusta' },
        { name: 'Maryland', capital: 'Annapolis' },
        { name: 'Massachusetts', capital: 'Boston' },
        { name: 'Michigan', capital: 'Lansing' },
        { name: 'Minnesota', capital: 'St. Paul' },
        { name: 'Mississippi', capital: 'Jackson' },
        { name: 'Missouri', capital: 'Jefferson City' },
        { name: 'Montana', capital: 'Helena' },
        { name: 'Nebraska', capital: 'Lincoln' },
        { name: 'Nevada', capital: 'Carson City' },
        { name: 'New Hampshire', capital: 'Concord' },
        { name: 'New Jersey', capital: 'Trenton' },
        { name: 'New Mexico', capital: 'Santa Fe' },
        { name: 'New York', capital: 'Albany' },
        { name: 'North Carolina', capital: 'Raleigh' },
        { name: 'North Dakota', capital: 'Bismarck' },
        { name: 'Ohio', capital: 'Columbus' },
        { name: 'Oklahoma', capital: 'Oklahoma City' },
        { name: 'Oregon', capital: 'Salem' },
        { name: 'Pennsylvania', capital: 'Harrisburg' },
        { name: 'Rhode Island', capital: 'Providence' },
        { name: 'South Carolina', capital: 'Columbia' },
        { name: 'South Dakota', capital: 'Pierre' },
        { name: 'Tennessee', capital: 'Nashville' },
        { name: 'Texas', capital: 'Austin' },
        { name: 'Utah', capital: 'Salt Lake City' },
        { name: 'Vermont', capital: 'Montpelier' },
        { name: 'Virginia', capital: 'Richmond' },
        { name: 'Washington', capital: 'Olympia' },
        { name: 'West Virginia', capital: 'Charleston' },
        { name: 'Wisconsin', capital: 'Madison' },
        { name: 'Wyoming', capital: 'Cheyenne' }
    ];

    items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

    ds = new MyDataSource();

    constructor(private scrollDispatcher: ScrollDispatcher) {}

    ngOnInit(): void {
        this.scrollDispatcher.scrolled().subscribe((scrollable: CdkScrollable) => {
            if (scrollable) {
                console.log('发生scroll了，來源于：');
                console.log('scrollTop:', scrollable.getElementRef().nativeElement.scrollTop);
                console.log('clientHeight:', scrollable.getElementRef().nativeElement.clientHeight);
                console.log('scrollHeight:', scrollable.getElementRef().nativeElement.scrollHeight);
                console.log('elementScrolled:', scrollable.elementScrolled());
                console.log('measureScrollOffset:', scrollable.measureScrollOffset('top'));

                scrollable.scrollTo({ bottom: 100, behavior: 'smooth' }); // behavior设为auto，出现闪烁？ 此处设置的bottom值是滚动到距离底部100px
            }
        });
    }
}

export class MyDataSource extends DataSource<string | undefined> {
    private _length = 100000;
    private _pageSize = 100;
    private _cachedData = Array.from<string>({ length: this._length });
    private _fetchedPages = new Set<number>();
    private readonly _dataStream = new BehaviorSubject<(string | undefined)[]>(this._cachedData);
    private readonly _subscription = new Subscription();

    connect(collectionViewer: CollectionViewer): Observable<(string | undefined)[]> {
        this._subscription.add(
            collectionViewer.viewChange.subscribe(range => {
                const startPage = this._getPageForIndex(range.start);
                const endPage = this._getPageForIndex(range.end - 1);
                for (let i = startPage; i <= endPage; i++) {
                    this._fetchPage(i);
                }
            })
        );
        return this._dataStream;
    }

    disconnect(): void {
        this._subscription.unsubscribe();
    }

    private _getPageForIndex(index: number): number {
        return Math.floor(index / this._pageSize);
    }

    private _fetchPage(page: number) {
        if (this._fetchedPages.has(page)) {
            return;
        }
        this._fetchedPages.add(page);

        // Use `setTimeout` to simulate fetching data from server.
        setTimeout(() => {
            this._cachedData.splice(
                page * this._pageSize,
                this._pageSize,
                ...Array.from({ length: this._pageSize }).map((_, i) => `Item #${page * this._pageSize + i}`)
            );
            this._dataStream.next(this._cachedData);
        }, Math.random() * 1000 + 200);
    }
}
