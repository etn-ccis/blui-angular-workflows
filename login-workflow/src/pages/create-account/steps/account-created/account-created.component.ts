import { Component, Input, OnInit } from '@angular/core';
import { PxbAuthConfig } from '../../../../services/config/auth-config';
import { PxbAuthTranslations } from '../../../../translations/auth-translations';

@Component({
    selector: 'pxb-create-account-account-created-step',
    template: `
        <div class="mat-title pxb-auth-title">{{ translate.CREATE_ACCOUNT.ACCOUNT_CREATED.TITLE }}</div>
        <div class="pxb-auth-full-height" style="justify-content: center;">
            <pxb-empty-state
                class="pxb-account-created-empty-state"
                [title]="translate.CREATE_ACCOUNT.ACCOUNT_CREATED.WELCOME_MESSAGE_TITLE(userName)"
                [description]="translate.CREATE_ACCOUNT.ACCOUNT_CREATED.WELCOME_MESSAGE_DESCRIPTION(email)"
            >
                <mat-icon pxb-empty-icon class="pxb-account-created-icon">check_circle</mat-icon>
            </pxb-empty-state>
        </div>
    `,
    styleUrls: ['./account-created.component.scss'],
})
export class PxbAccountCreatedComponent implements OnInit {
    @Input() userName;
    @Input() email;

    translate: PxbAuthTranslations;

    constructor(private readonly _pxbAuthConfig: PxbAuthConfig) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
    }
}
