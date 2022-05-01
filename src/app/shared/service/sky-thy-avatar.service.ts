import { Injectable } from '@angular/core';
import { ThyAvatarService, ThyDefaultAvatarService } from 'ngx-tethys/avatar';
import { SafeHtml } from '@angular/platform-browser';

@Injectable()
export class SkyThyAvatarService extends ThyDefaultAvatarService {
    constructor() {
        super();
    }

    nameTransform(name: string): string | SafeHtml {
        return name;
    }
}

export const thyAvatarProvider = {
    provide: ThyAvatarService,
    useClass: SkyThyAvatarService,
};
