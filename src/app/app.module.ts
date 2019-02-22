import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationsComponent } from './demo/index';
import { SHARED_DIRECTIVE } from './directive/index';
import { SHARED_COMPONENT, SHARED_ENTRY_COMPONENT } from './shared';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { InitComponent } from './demo/init/init.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationsComponent,
    ...SHARED_DIRECTIVE,
    ...SHARED_COMPONENT,
    ...SHARED_ENTRY_COMPONENT,
    InitComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
