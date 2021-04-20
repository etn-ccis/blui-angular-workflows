import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PxbAuthConfig } from '../../../../services/config/auth-config';
import { PxbAuthTranslations } from '../../../../translations/auth-translations';
import { AUTH_ROUTES } from '../../../../auth/auth.routes';

export type RegistrationSuccessScreenContext = {
    firstName: string;
    lastName: string;
    email: string;
    //... Custom form keys appended.
};

@Component({
    selector: 'pxb-create-account-account-created-step',
    template: `
        <ng-container *ngIf="!registrationSuccessScreen">
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
            <mat-divider class="pxb-auth-divider" style="margin-bottom: 16px;"></mat-divider>
            <div class="pxb-auth-action-button-container">
                <button mat-flat-button color="primary" (click)="navigateToLogin()" style="width: 100%">
                    {{ translate.CREATE_ACCOUNT.ACCOUNT_CREATED.CONTINUE_BUTTON }}
                </button>
            </div>
        </ng-container>
        <div style="display: flex; flex-direction: column" [style.flex]="!registrationSuccessScreen ? '' : '1 1 0'">
            <ng-template
                [ngTemplateOutlet]="registrationSuccessScreen"
                [ngTemplateOutletContext]="registrationSuccessScreenContext"
            ></ng-template>
        </div>
    `,
    styleUrls: ['./account-created.component.scss'],
})
export class PxbAccountCreatedComponent implements OnInit {
    @Input() userName;
    @Input() email;
    @Input() registrationSuccessScreen: TemplateRef<RegistrationSuccessScreenContext>;
    @Input() registrationSuccessScreenContext: RegistrationSuccessScreenContext;

    translate: PxbAuthTranslations;

    constructor(
        private readonly _router: Router,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    navigateToLogin(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }
}
