import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DEMO_COMPONENTS } from './demo/index';
import { SHARED_DIRECTIVE } from './directive/index';
import { SHARED_COMPONENT, SHARED_ENTRY_COMPONENT } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { InitComponent } from './demo/init/init.component';
import { ThyAvatarModule } from './shared/component/avatar';

@NgModule({
    declarations: [AppComponent, ...DEMO_COMPONENTS, ...SHARED_DIRECTIVE, ...SHARED_COMPONENT, ...SHARED_ENTRY_COMPONENT, InitComponent],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, ScrollDispatchModule, HttpClientModule, ThyAvatarModule],
    providers: [],
    bootstrap: [AppComponent],
    exports: [...DEMO_COMPONENTS, ThyAvatarModule],
})
export class AppModule {}
