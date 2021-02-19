import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { PxbAuthSecurityService } from '../../../../services/state/auth-security.service';
import { PxbCreateAccountErrorDialogService } from '../../../../services/dialog/create-account-error-dialog.service';
import { PxbRegisterUIService } from '../../../../services/api/register-ui.service';
import { ErrorDialogData } from '../../../../services/dialog/error-dialog.service';
import { PxbAuthConfig } from './../../../../services/config/auth-config';

import { PxbAuthTranslations } from '../../../../translations/auth-translations';

@Component({
    selector: 'pxb-create-account-verify-email-step',
    template: `
        <div class="mat-title pxb-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.VERIFY_EMAIL.TITLE"></div>
        <p
            class="mat-body-1"
            style="margin-bottom: 24px;"
            [innerHTML]="translate.CREATE_ACCOUNT.VERIFY_EMAIL.INSTRUCTIONS"
        ></p>
        <mat-divider class="pxb-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
        <div class="pxb-auth-full-height">
            <form>
                <mat-form-field appearance="fill" style="width: 100%;">
                    <mat-label>{{ translate.CREATE_ACCOUNT.VERIFY_EMAIL.CODE_FORM_LABEL }}</mat-label>
                    <input
                        id="verification"
                        name="verification"
                        matInput
                        [formControl]="verificationCodeFormControl"
                        (ngModelChange)="updateCode(verificationCodeFormControl.value)"
                        (keyup.enter)="advance.emit()"
                    />
                    <mat-error
                        *ngIf="verificationCodeFormControl.hasError('required')"
                        [innerHTML]="
                            translate.GENERAL.IS_REQUIRED_ERROR(translate.CREATE_ACCOUNT.VERIFY_EMAIL.CODE_FORM_LABEL)
                        "
                    >
                    </mat-error>
                </mat-form-field>
            </form>
            <button
                mat-flat-button
                color="primary"
                style="width: 100%; margin-top: 8px;"
                (click)="sendVerificationEmail()"
                [innerHTML]="translate.CREATE_ACCOUNT.VERIFY_EMAIL.RESEND_BUTTON"
            ></button>
        </div>
    `,
})
export class PxbVerifyEmailComponent {
    @Input() verificationCode: string;
    @Input() email: string;

    @Output() verificationCodeChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() advance: EventEmitter<void> = new EventEmitter<void>();

    verificationCodeFormControl: FormControl;
    translate: PxbAuthTranslations;

    constructor(
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbRegisterService: PxbRegisterUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbErrorDialogService: PxbCreateAccountErrorDialogService
    ) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
        this.verificationCodeFormControl = new FormControl(this.verificationCode, Validators.required);
    }

    sendVerificationEmail(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .requestRegistrationCode(this.email)
            .then(() => {
                this._pxbSecurityService.setLoading(false);
            })
            .catch((data: ErrorDialogData) => {
                this._pxbErrorDialogService.openDialog(data);
                this._pxbSecurityService.setLoading(false);
            });
    }

    updateCode(code: string): void {
        this.verificationCodeChange.emit(code);
    }
}
