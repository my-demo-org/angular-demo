import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimationsComponent, InitComponent } from './demo/index';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/init',
    pathMatch: 'full'
  },
  {
    path: 'init',
    component: InitComponent
  },
  {
    path: 'animation',
    component: AnimationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
