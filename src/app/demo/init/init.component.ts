import { Component, OnInit } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {
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

  constructor(private scrollDispatcher: ScrollDispatcher) {}

  ngOnInit() {
    this.scrollDispatcher.scrolled().subscribe((scrollable: CdkScrollable) => {
      if (scrollable) {
        console.log('发生scroll了，來源于：');
        console.log(scrollable.getElementRef().nativeElement.scrollTop);
        console.log(scrollable.getElementRef().nativeElement.clientHeight);
        console.log(scrollable.getElementRef().nativeElement.scrollHeight);

      }
    });
  }
}
