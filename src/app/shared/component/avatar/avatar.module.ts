import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyAvatarComponent } from './avatar.component';
import { AvatarPipes } from './avatar.pipe';
import { ThyAvatarService, ThyDefaultAvatarService } from './avatar.service';
import { ThyIconModule } from 'ngx-tethys';

@NgModule({
    declarations: [ThyAvatarComponent, AvatarPipes],
    imports: [CommonModule, ThyIconModule],
    providers: [
        {
            provide: ThyAvatarService,
            useClass: ThyDefaultAvatarService
        }
    ],
    exports: [ThyAvatarComponent, AvatarPipes]
})
export class ThyAvatarModule {}
