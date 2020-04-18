import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitComponent, WWOpenDataComponent } from './demo/index';
import { AnimationsComponent } from './demo/animations';

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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
