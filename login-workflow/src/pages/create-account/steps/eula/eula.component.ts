import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { PxbAuthConfig } from './../../../../services/config/auth-config';
import { PxbRegisterUIService } from '../../../../services/api/register-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../../../../services/state/auth-security.service';
import { PxbAuthTranslations } from '../../../../translations/auth-translations';

@Component({
    selector: 'pxb-create-account-eula-step',
    styleUrls: ['eula.component.scss'],
    template: `
        <div class="mat-title pxb-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.EULA.TITLE"></div>
        <div
            #eulaVC
            *ngIf="eula"
            class="pxb-auth-full-height"
            style="overflow: auto"
            (scroll)="checkScrollDistance($event)"
            [innerHTML]="sanitizer.sanitize(1, eula)"
        ></div>
        <pxb-empty-state *ngIf="!eula && !isLoading" class="pxb-auth-full-height pxb-auth-eula-error">
            <div pxb-title><div [innerHTML]="translate.CREATE_ACCOUNT.EULA.LOAD_ERROR_TITLE"></div></div>
            <div pxb-description><div [innerHTML]="translate.CREATE_ACCOUNT.EULA.LOAD_ERROR_DESCRIPTION"></div></div>
            <mat-icon pxb-empty-icon color="warn">error</mat-icon>
            <button pxb-actions mat-raised-button color="primary" (click)="getEULA()">
                <mat-icon>replay</mat-icon>
                {{ translate.CREATE_ACCOUNT.EULA.RELOAD_BUTTON }}
            </button>
        </pxb-empty-state>
        <div *ngIf="eula" class="pxb-eula-confirm-agreement">
            <mat-checkbox
                class="pxb-eula-checkbox"
                [disabled]="!userScrolledBottom"
                [(ngModel)]="userAcceptsEula"
                (change)="userAcceptsEulaChange.emit(userAcceptsEula)"
                ngDefaultControl
            >
                {{ translate.CREATE_ACCOUNT.EULA.CONFIRM_READ }}
            </mat-checkbox>
        </div>
    `
    ,
})
export class PxbEulaComponent implements OnInit {
    @Input() userAcceptsEula: boolean;
    @Output() userAcceptsEulaChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('eulaVC') eulaVC: ElementRef;

    eula: string;
    isLoading: boolean;
    userScrolledBottom = false;
    translate: PxbAuthTranslations;

    constructor(
        public sanitizer: DomSanitizer,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbRegisterService: PxbRegisterUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService
    ) {
        this._pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
        });
    }

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
        // Configurable option to require users to scroll to bottom of EULA before accepting.
        if (!this._pxbAuthConfig.eulaScrollLock) {
            this.userScrolledBottom = true;
        }
        // User has already scrolled to the bottom and accepted the EULA.
        if (this.userAcceptsEula) {
            this.userScrolledBottom = true;
        }
        this.getEULA();
    }

    getEULA(): void {
        if (this._pxbAuthConfig.eula) {
            this.afterGetEula(this._pxbAuthConfig.eula);
        } else {
            this._pxbSecurityService.setLoading(true);
            this._pxbRegisterService
                .loadEULA()
                .then((eula: string) => {
                    this.afterGetEula(eula);
                })
                .catch(() => {
                    this._pxbSecurityService.setLoading(false);
                });
        }
    }

    afterGetEula(eula: string): void {
        this.eula = eula;
        this._pxbSecurityService.setLoading(false);
        this._changeDetectorRef.detectChanges();
        if (!this.userAcceptsEula) {
            const el = this.eulaVC.nativeElement;
            const isEulaScrollable = el.scrollHeight > el.clientHeight;
            this.userScrolledBottom = !isEulaScrollable;
        }
    }

    checkScrollDistance(e: Event): void {
        if (this.userScrolledBottom) {
            return;
        }
        const el = e.target as HTMLElement;
        this.userScrolledBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 1;
    }
}
