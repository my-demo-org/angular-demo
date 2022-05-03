import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DEMO_COMPONENTS } from './demo/index';
import { SHARED_DIRECTIVE } from './directive/index';
import { SHARED_COMPONENT, SHARED_ENTRY_COMPONENT } from './shared';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { InitComponent } from './demo/init/init.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { thyAvatarProvider } from './shared/service/sky-thy-avatar.service';
import { CDK_COMPONENTS } from './demo/cdk';
import { ThyMenuModule } from 'ngx-tethys/menu';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';

@NgModule({
    declarations: [
        AppComponent,
        ...DEMO_COMPONENTS,
        ...SHARED_DIRECTIVE,
        ...SHARED_COMPONENT,
        ...SHARED_ENTRY_COMPONENT,
        InitComponent,
        CDK_COMPONENTS,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ThyAvatarModule,
        OverlayModule,
        ThyMenuModule,
        ThyIconModule,
        ThyButtonModule,
        ThySpaceModule,
        ThyDropdownModule,
    ],
    providers: [thyAvatarProvider],
    bootstrap: [AppComponent],
    exports: [...DEMO_COMPONENTS, ThyAvatarModule],
})
export class AppModule {}
