import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BluiAuthConfig } from '../../../../services/config/auth-config';
import { BluiAuthTranslations } from '../../../../translations/auth-translations';
import { AUTH_ROUTES } from '../../../../auth/auth.routes';

export type RegistrationSuccessScreenContext = {
    firstName: string;
    lastName: string;
    email: string;
    //... Custom form keys appended.
};

@Component({
    selector: 'blui-create-account-account-created-step',
    template: `
        <ng-container *ngIf="!registrationSuccessScreen">
            <div class="mat-title blui-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.ACCOUNT_CREATED.TITLE"></div>
            <div class="blui-auth-full-height" style="justify-content: center;">
                <blui-empty-state class="blui-account-created-empty-state">
                    <div blui-title>
                        <div
                            [innerHTML]="translate.CREATE_ACCOUNT.ACCOUNT_CREATED.WELCOME_MESSAGE_TITLE(userName)"
                        ></div>
                    </div>
                    <div blui-description>
                        <div
                            [innerHTML]="translate.CREATE_ACCOUNT.ACCOUNT_CREATED.WELCOME_MESSAGE_DESCRIPTION(email)"
                        ></div>
                    </div>
                    <mat-icon blui-empty-icon class="blui-account-created-icon" color="primary">check_circle</mat-icon>
                </blui-empty-state>
            </div>
            <mat-divider class="blui-auth-divider blui-auth-action-button-divider"></mat-divider>
            <div class="blui-auth-action-button-container">
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
})
export class BluiAccountCreatedComponent implements OnInit {
    @Input() userName;
    @Input() email;
    @Input() registrationSuccessScreen: TemplateRef<RegistrationSuccessScreenContext>;
    @Input() registrationSuccessScreenContext: RegistrationSuccessScreenContext;

    translate: BluiAuthTranslations;

    constructor(
        private readonly _router: Router,
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.translate = this._bluiAuthConfig.getTranslations();
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    navigateToLogin(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }
}
