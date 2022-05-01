import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ThyAvatarService } from 'ngx-tethys/avatar';

@Component({
    selector: 'app-ww-open-data',
    templateUrl: './open-data.component.html',
})
export class WWOpenDataComponent implements OnInit {
    _agentConfig: any;

    _config: any;

    _wx = (window as any).wx;

    wx_members = [
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

    default_members = [
        {
            avatar: 'https://s3.cn-north-1.amazonaws.com.cn/lcavatar/9808e3fe-6582-4454-bd3c-67ee5acfad64_40x40.png',
            desc: '',
            display_name: '蔡美琴👑',
            display_name_pinyin: 'cmq,caimeiqin',
            email: 'caimeiqin@worktile.com',
            mobile: '15727325189',
            name: 'cmq',
            preferences: { locale: 'zh-cn' },
            role: 1,
            short_code: 'yc046',
            status: 1,
            team: '567b66f417986913404da9ff',
            uid: '9dbfd438aa1c42bfa3c34060506146e0',
        },
        {
            avatar: 'https://s3.cn-north-1.amazonaws.com.cn/lcavatar/08445843-c109-4ad0-add3-354c09660192_40x40.png',
            desc: '',
            display_name: '赵力',
            display_name_pinyin: 'zl,zhaoli',
            email: 'zhaoli@worktile.com',
            mobile: '18500136115',
            name: 'zhaoli',
            preferences: { locale: 'zh-cn' },
            role: 1,
            short_code: 'yc006',
            status: 1,
            team: '567b66f417986913404da9ff',
            uid: '16a6e082593f4df495bf9f474345f294',
        },
    ];

    value: string;

    // 通过http://qywx-dev.worktile.live/api/linker/qywx/config?url=http://qywx.goldlion.info:8080/open-data获取data数据
    data = {
        config: {
            beta: true,
            debug: true,
            appId: 'ww7bd5c9c41119ca5d',
            timestamp: 1587627510,
            nonceStr: 'OqSMalLxmYYrtKvP',
            signature: 'aa07f7010a90a680419fd3b17f3b5cb537626e42',
        },
        agentConfig: {
            corpid: 'ww53c08376d19cd9b6',
            agentid: 1000060,
            timestamp: 1587627510,
            nonceStr: 'OqSMalLxmYYrtKvP',
            signature: '59fd35b4d84da8cc9f42e3af34acc3f61395b1d8',
        },
    };

    isFromQywx: Boolean = true;

    constructor(private http: HttpClient, private thyAvatarService: ThyAvatarService, private domSanitizer: DomSanitizer) {}

    ngOnInit() {
        if (this.isFromQywx) {
            this.resetWxInit();
        }
    }

    resetWxInit() {
        this.thyAvatarService.nameTransform = (name: string) => {
            return this.domSanitizer.bypassSecurityTrustHtml(`<ww-open-data type="userName" openid="${name}"></ww-open-data>`);
        };
        this.getWxSign();
    }

    change() {
        this.isFromQywx = !this.isFromQywx;
        if (this.isFromQywx) {
            this.resetWxInit();
        } else {
            this.thyAvatarService.nameTransform = (name: string) => {
                return name;
            };
        }
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
                // (window as any).WWOpenData.bind(document.querySelector('ww-open-data'));
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
