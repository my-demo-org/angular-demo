import { Direction, Directionality } from '@angular/cdk/bidi';
import { NoopScrollStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, HostBinding, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OverlayPortalMenuComponent } from './portal-menu.component';

@Component({
    selector: 'cdk-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
})
export class CdkOverlayComponent implements OnInit, OnDestroy {
    @HostBinding('class') hostClass = 'cdk-overlay-wrapper';

    isOpen = false;

    overlayRef: OverlayRef;

    private ngUnsubscribe$ = new Subject();

    instance: OverlayPortalMenuComponent;

    constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

    ngOnInit(): void {}

    createOverlay() {
        const config = new OverlayConfig();
        config.positionStrategy = this.overlay
            .position()
            .global() // 全局显示
            .centerHorizontally() // 水平居中
            .centerVertically(); // 垂直居中

        config.hasBackdrop = true; // 浮层背景

        config.width = 200;
        config.height = 300;

        const overlayRef = this.overlay.create(config); // OverlayRef，overlay层

        overlayRef.backdropClick().subscribe(() => {
            overlayRef.dispose();
        });

        // 创建一个ComponentPortal，attach到overlayRef，这时overlay层就显示了
        overlayRef.attach(new ComponentPortal(OverlayPortalMenuComponent, this.viewContainerRef));
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
