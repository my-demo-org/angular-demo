import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitComponent, WWOpenDataComponent } from './demo/index';
import { AnimationsComponent } from './demo/animations';
import { OverlayComponent } from './demo/cdk/overlay/overlay.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'init',
        pathMatch: 'full',
    },
    {
        path: 'init',
        component: InitComponent,
    },
    {
        path: 'animation',
        component: AnimationsComponent,
    },
    {
        path: 'open-data',
        component: WWOpenDataComponent,
    },
    {
        path: 'overlay',
        component: OverlayComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
