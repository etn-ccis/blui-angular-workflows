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

import { BluiAuthConfig } from './../../../../services/config/auth-config';
import { BluiRegisterUIService } from '../../../../services/api';
import { BluiAuthSecurityService, SecurityContext } from '../../../../services/state/auth-security.service';
import { BluiAuthTranslations } from '../../../../translations/auth-translations';

@Component({
    selector: 'blui-create-account-eula-step',
    styleUrls: ['eula.component.scss'],
    template: `
        <div class="mat-title blui-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.EULA.TITLE"></div>
        <div
            #eulaVC
            *ngIf="eula"
            class="blui-auth-full-height"
            style="overflow: auto"
            (scroll)="checkScrollDistance($event)"
            [innerHTML]="sanitizer.sanitize(1, eula)"
        ></div>
        <blui-empty-state *ngIf="!eula && !isLoading" class="blui-auth-full-height blui-auth-eula-error">
            <div blui-title><div [innerHTML]="translate.CREATE_ACCOUNT.EULA.LOAD_ERROR_TITLE"></div></div>
            <div blui-description><div [innerHTML]="translate.CREATE_ACCOUNT.EULA.LOAD_ERROR_DESCRIPTION"></div></div>
            <mat-icon blui-empty-icon color="warn">error</mat-icon>
            <button blui-actions mat-raised-button color="primary" (click)="getEULA()">
                <mat-icon>replay</mat-icon>
                {{ translate.CREATE_ACCOUNT.EULA.RELOAD_BUTTON }}
            </button>
        </blui-empty-state>
        <div *ngIf="eula" class="blui-eula-confirm-agreement">
            <mat-checkbox
                class="blui-eula-checkbox"
                [disabled]="!userScrolledBottom"
                [(ngModel)]="userAcceptsEula"
                (change)="userAcceptsEulaChange.emit(userAcceptsEula)"
                ngDefaultControl
            >
                {{ translate.CREATE_ACCOUNT.EULA.CONFIRM_READ }}
            </mat-checkbox>
        </div>
    `,
})
export class BluiEulaComponent implements OnInit {
    @Input() userAcceptsEula: boolean;
    @Output() userAcceptsEulaChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('eulaVC') eulaVC: ElementRef;

    eula: string;
    isLoading: boolean;
    userScrolledBottom = false;
    translate: BluiAuthTranslations;

    constructor(
        public sanitizer: DomSanitizer,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiRegisterService: BluiRegisterUIService,
        private readonly _bluiSecurityService: BluiAuthSecurityService
    ) {
        this._bluiSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
        });
    }

    ngOnInit(): void {
        this.translate = this._bluiAuthConfig.getTranslations();
        // Configurable option to require users to scroll to bottom of EULA before accepting.
        if (!this._bluiAuthConfig.eulaScrollLock) {
            this.userScrolledBottom = true;
        }
        // User has already scrolled to the bottom and accepted the EULA.
        if (this.userAcceptsEula) {
            this.userScrolledBottom = true;
        }
        this.getEULA();
    }

    getEULA(): void {
        if (this._bluiAuthConfig.eula) {
            this.afterGetEula(this._bluiAuthConfig.eula);
        } else {
            this._bluiSecurityService.setLoading(true);
            this._bluiRegisterService
                .loadEULA()
                .then((eula: string) => {
                    this.afterGetEula(eula);
                })
                .catch(() => {
                    this._bluiSecurityService.setLoading(false);
                });
        }
    }

    afterGetEula(eula: string): void {
        this.eula = eula;
        this._bluiSecurityService.setLoading(false);
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
