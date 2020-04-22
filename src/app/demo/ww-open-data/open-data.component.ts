import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-ww-open-data',
    templateUrl: './open-data.component.html',
})
export class WWOpenDataComponent implements OnInit {
    _agentConfig: any;

    _config: any;

    _wx = (window as any).wx;

    members = [
        {
            avatar: 'http://wework.qpic.cn/bizmail/xMtdH5hJbk9IV1AiaFc49wko6Ko5q3pXt6zW3veyufKggs5Mxibh8VPQ/0',
            created_at: 1587198231,
            display_name: 'CaiMeiQin',
            email: '',
            imToken: '01c554d00a4a49ce8de0c3e8e440d5a1',
            mobile: null,
            name: 'CaiMeiQin',
            role: 1,
            team: '5e8ecaaaf439da963515f873',
            title: '',
            uid: 'e937502bad874dccb311f09720872ea3',
        },
        {
            avatar: 'http://wework.qpic.cn/bizmail/ZYFicmUoibHWuJianjia5jrc6hrDdzmzdQ8UvIUKzBORg4nfr8ibkspjgHQ/0',
            display_name: 'DaYao',
            display_name_pinyin: 'DaYao,DaYao',
            email: '',
            mobile: null,
            mobile_area: '',
            name: 'DaYao',
            role: 1,
            short_code: null,
            status: 1,
            team: '5e8ecaaaf439da963515f873',
            uid: '64a58f70337b4746bd1f94c1ebd82157',
        },
        {
            avatar: null,
            display_name: 'LiuJingJian',
            display_name_pinyin: 'LiuJingJian,LiuJingJian',
            email: '',
            mobile: null,
            mobile_area: '',
            name: 'LiuJingJian',
            role: 1,
            short_code: null,
            status: 1,
            team: '5e8ecaaaf439da963515f873',
            uid: '9ef63c42e05b4cfebd7c57fd77a41aac',
        },
    ];

    data = {
        config: {
            beta: true,
            debug: true,
            appId: 'ww7bd5c9c41119ca5d',
            timestamp: 1587526809,
            nonceStr: 'sDGvVZRzseFPYQBg',
            signature: 'b4e8c215307bae7dda435964b8a373d78f0d8638',
        },
        agentConfig: {
            corpid: 'ww53c08376d19cd9b6',
            agentid: 1000060,
            timestamp: 1587526809,
            nonceStr: 'sDGvVZRzseFPYQBg',
            signature: '24abb3741468eb8c54eb734b62d9a5f161d70dee',
        },
    };

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.getWxSign();
    }

    getWxSign() {
        this._agentConfig = this.data.agentConfig;
        this._config = this.data.config;
        this.judgeBrowser();
    }

    private judgeBrowser() {
        if (/MicroMessenger/i.test(navigator.userAgent)) {
            this.config();
        }
        this.agentConfig();
    }

    config() {
        return this._wx.config({
            ...this._config,
            jsApiList: [],
            success: (res: any) => {
                console.log(res);
            },
            fail: (res: any) => {
                console.log(res);
            },
        });
    }

    agentConfig() {
        return this._wx.agentConfig({
            ...this._agentConfig,
            jsApiList: [],
            success: (res: any) => {
                // 回调
                console.log(res);
                // this.bindWWOpenData();
            },
            fail: (res: any) => {
                console.log(res);
            },
        });
    }

    // bindWWOpenData() {
    //     this.members.forEach((member) => {
    //         const container = document.getElementById(`wwOpenData${member.name}`);
    //         const element = document.createElement('ww-open-data');
    //         element.setAttribute('type', 'userName');
    //         element.setAttribute('openid', member.display_name);
    //         container.appendChild(element);
    //     });
    // }
}
