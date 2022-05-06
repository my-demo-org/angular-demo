import { Direction, Directionality } from '@angular/cdk/bidi';
import { NoopScrollStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OverlayPortalMenuComponent } from './portal-menu.component';

@Component({
    selector: 'cdk-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
})
export class CdkOverlayComponent implements OnInit, OnDestroy {
    @HostBinding('class') hostClass = 'cdk-overlay-wrapper';

    isOpen = false;

    overlayTemplateRef: OverlayRef;

    overlayConnectRef: OverlayRef;

    private ngUnsubscribe$ = new Subject();

    instance: OverlayPortalMenuComponent;

    globalOverlayPosition = 0;

    @ViewChild('overlayGlobalTemplate') templateGlobalPortals: TemplatePortal;

    @ViewChild('connectComponentOrigin', { static: true }) _overlayConnectComponentOrigin: ElementRef;

    constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

    ngOnInit(): void {}

    // add a overlay
    createOverlay(config: OverlayConfig) {
        const overlayRef = this.overlay.create(config); // OverlayRef，overlay层

        overlayRef.backdropClick().subscribe(() => {
            overlayRef.dispose(); // 点击背景关掉弹窗
        });

        // 创建一个ComponentPortal，attach到overlayRef，这时overlay层就显示了
        overlayRef.attach(new ComponentPortal(OverlayPortalMenuComponent, this.viewContainerRef));
    }

    // 全局显示，页面中心显示
    showOverlayGlobalPanelCenter() {
        const config = new OverlayConfig();
        config.positionStrategy = this.overlay
            .position()
            .global() // 全局显示
            .centerHorizontally() // 水平居中
            .centerVertically(); // 垂直居中

        config.hasBackdrop = true; // 浮层背景

        config.width = 200;
        config.height = 300;

        this.createOverlay(config);
    }

    // 全局显示，显示位置自己控制
    showOverlayGlobalPanelPosition() {
        const config = new OverlayConfig();
        this.globalOverlayPosition = 60;
        config.positionStrategy = this.overlay
            .position()
            .global()
            .left(`${this.globalOverlayPosition}px`) // 自己控制位置
            .top(`${this.globalOverlayPosition}px`);

        config.hasBackdrop = true;
        config.width = 200;
        config.height = 300;
        this.createOverlay(config);
    }

    // --------- overlay 展示 ng-template 内容 -------

    showOverlayPanelTemplate() {
        const config = new OverlayConfig();
        this.globalOverlayPosition = 90;
        config.positionStrategy = this.overlay.position().global().centerHorizontally().top(`${this.globalOverlayPosition}px`);
        this.overlayTemplateRef = this.overlay.create(config);
        this.overlayTemplateRef.attach(this.templateGlobalPortals);
    }

    dismissOverlayPanelTemplate() {
        if (this.overlayTemplateRef && this.overlayTemplateRef.hasAttached()) {
            this.overlayTemplateRef.dispose();
        }
    }

    // --------- overlay 依赖某个视图(origin)显示ng-template的内容 -------

    // TODO：鼠标移入会出现频繁闪动，使用mouseover和mouseleave导致的。

    showOverlayPanelConnectComponent() {
        const strategy = this.overlay
            .position()
            .flexibleConnectedTo(this._overlayConnectComponentOrigin.nativeElement)
            .withPositions([{ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetX: 0, offsetY: 0 }]);
        // origin 组件(依附空组件)的那个点(originX,originY)和overlay组件的点(overlayX,overlayY)重合，从而确定overlay组件显示的位置
        strategy.withLockedPosition(true);
        const config = new OverlayConfig({ positionStrategy: strategy });
        config.scrollStrategy = this.overlay.scrollStrategies.reposition(); // 跟随滑动的策略
        // config.hasBackdrop = true;
        config.width = 200;
        config.height = 300;
        this.overlayConnectRef = this.overlay.create(config);
        this.overlayConnectRef.attach(new ComponentPortal(OverlayPortalMenuComponent, this.viewContainerRef));
    }

    dismissOverlayPanelConnectComponent() {
        if (this.overlayConnectRef && this.overlayConnectRef.hasAttached()) {
            this.overlayConnectRef.dispose();
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
