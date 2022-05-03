import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'overlay-portal-menu',
    templateUrl: './portal-menu.component.html',
})
export class OverlayPortalMenuComponent {
    @HostBinding('attr.class') hostClass = 'overlay-portal-menu';

    constructor() {}
}
