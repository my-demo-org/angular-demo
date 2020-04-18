import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DEMO_COMPONENTS } from './demo/index';
import { SHARED_DIRECTIVE } from './directive/index';
import { SHARED_COMPONENT, SHARED_ENTRY_COMPONENT } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NgxTethysModule } from 'ngx-tethys';

import { AppComponent } from './app.component';
import { InitComponent } from './demo/init/init.component';

@NgModule({
    declarations: [AppComponent, ...DEMO_COMPONENTS, ...SHARED_DIRECTIVE, ...SHARED_COMPONENT, ...SHARED_ENTRY_COMPONENT, InitComponent],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, ScrollDispatchModule, HttpClientModule, NgxTethysModule],
    providers: [],
    bootstrap: [AppComponent],
    exports: [...DEMO_COMPONENTS, NgxTethysModule],
})
export class AppModule {}
