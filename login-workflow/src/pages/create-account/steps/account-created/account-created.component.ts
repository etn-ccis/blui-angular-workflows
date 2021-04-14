import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PxbAuthConfig } from '../../../../services/config/auth-config';
import { PxbAuthTranslations } from '../../../../translations/auth-translations';
import { isEmptyView } from '../../../../util/view-utils';

@Component({
    selector: 'pxb-create-account-account-created-step',
    template: `
        <ng-container *ngIf="isEmpty(successContentEl)">
            <div class="mat-title pxb-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.ACCOUNT_CREATED.TITLE"></div>
            <div class="pxb-auth-full-height" style="justify-content: center;">
                <pxb-empty-state class="pxb-account-created-empty-state">
                    <div pxb-title>
                        <div
                            [innerHTML]="translate.CREATE_ACCOUNT.ACCOUNT_CREATED.WELCOME_MESSAGE_TITLE(userName)"
                        ></div>
                    </div>
                    <div pxb-description>
                        <div
                            [innerHTML]="translate.CREATE_ACCOUNT.ACCOUNT_CREATED.WELCOME_MESSAGE_DESCRIPTION(email)"
                        ></div>
                    </div>
                    <mat-icon pxb-empty-icon class="pxb-account-created-icon" color="primary">check_circle</mat-icon>
                </pxb-empty-state>
            </div>
        </ng-container>
        <div #successContent>
            <ng-template [ngTemplateOutlet]="registrationSuccessScreen"></ng-template>
        </div>
    `,
    styleUrls: ['./account-created.component.scss'],
})
export class PxbAccountCreatedComponent implements OnInit {
    @Input() userName;
    @Input() email;
    @ViewChild('successContent') successContentEl: ElementRef;
    @Input() registrationSuccessScreen: TemplateRef<any>;

    translate: PxbAuthTranslations;
    isEmpty = (el: ElementRef): boolean => isEmptyView(el);

    constructor(
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }
}
