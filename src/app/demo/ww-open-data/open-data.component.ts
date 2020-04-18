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

    constructor(private http: HttpClient) {}

    member = {
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
    };

    data = {
        config: {
            beta: true,
            debug: true,
            appId: 'ww7bd5c9c41119ca5d',
            timestamp: 1587196739,
            nonceStr: 'QBqkxHZmSNARLcgY',
            signature: 'da476c4f4699f877ef3518011ebcc58fe384f64f',
        },
        agentConfig: {
            corpid: 'ww53c08376d19cd9b6',
            agentid: 1000058,
            timestamp: 1587196739,
            nonceStr: 'QBqkxHZmSNARLcgY',
            signature: 'd3595f79145dcf9d83ac4e92a91d808364d3d3e5',
        },
    };

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
                this.bindWWOpenData();
            },
            fail: (res: any) => {
                if (res.errMsg.indexOf('function not exist') > -1) {
                    alert('版本过低请升级');
                }
            },
        });
    }

    bindWWOpenData() {
        const container = document.getElementById('wwOpenData');
        const element = document.createElement('ww-open-data');
        element.setAttribute('type', 'userName');
        element.setAttribute('openid', this.member.display_name);
        container.appendChild(element);

        (window as any).WWOpenData.bindAll(document.querySelectorAll('ww-open-data'));
    }
}
