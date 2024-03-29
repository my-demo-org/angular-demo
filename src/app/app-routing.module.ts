import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitComponent, WWOpenDataComponent } from './demo/index';
import { AnimationsComponent } from './demo/animations';
import { CdkOverlayComponent } from './demo/cdk/overlay/overlay.component';
import { CdkScrollingComponent } from './demo/cdk/scrolling/scrolling.component';
import { CdkDragAndDropComponent } from './demo/cdk/drag-drop/drag-drop.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'init',
        pathMatch: 'full'
    },
    {
        path: 'init',
        component: InitComponent
    },
    {
        path: 'animation',
        component: AnimationsComponent
    },
    {
        path: 'open-data',
        component: WWOpenDataComponent
    },
    {
        path: 'overlay',
        component: CdkOverlayComponent
    },
    {
        path: 'scrolling',
        component: CdkScrollingComponent
    },
    {
        path: 'drag-and-drop',
        component: CdkDragAndDropComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
