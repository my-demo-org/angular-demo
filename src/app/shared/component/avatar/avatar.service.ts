import { Injectable } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

export abstract class ThyAvatarService {
    ignoreAvatarSrcPaths = [`default.png`];

    abstract avatarSrcTransform(src: string, size: number): string;

    abstract avatarNameTransform(name: string): string | SafeHtml;
}

@Injectable()
export class ThyDefaultAvatarService extends ThyAvatarService {
    constructor(private domSanitizer: DomSanitizer) {
        super();
    }
    avatarSrcTransform(src: string, size: number): string {
        return src;
    }

    avatarNameTransform(name: string): string | SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(`<wx-open-data type="userName" openid="{{${name}}}"></wx-open-data>`);
    }
}
