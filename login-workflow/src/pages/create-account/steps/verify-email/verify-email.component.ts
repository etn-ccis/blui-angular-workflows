import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { BluiAuthSecurityService } from '../../../../services/state/auth-security.service';
import { BluiCreateAccountErrorDialogService } from '../../../../services/dialog/create-account-error-dialog.service';
import { BluiRegisterUIService } from '../../../../services/api';
import { ErrorDialogData } from '../../../../services/dialog/error-dialog.service';
import { BluiAuthConfig } from './../../../../services/config/auth-config';

import { BluiAuthTranslations } from '../../../../translations/auth-translations';

@Component({
    selector: 'blui-create-account-verify-email-step',
    template: `
        <div class="mat-title blui-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.VERIFY_EMAIL.TITLE"></div>
        <p
            class="mat-body-1"
            style="margin-bottom: 24px;"
            [innerHTML]="translate.CREATE_ACCOUNT.VERIFY_EMAIL.INSTRUCTIONS"
        ></p>
        <mat-divider class="blui-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
        <div class="blui-auth-full-height">
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
            <div style="display: flex"><div class="mat-body-2"> {{ translate.CREATE_ACCOUNT.VERIFY_EMAIL.RESEND_LABEL }} </div> 
            <div
                color="primary"
                class="blui-auth-link mat-body-2"
                (click)="sendVerificationEmail()"
            > 
            {{ translate.CREATE_ACCOUNT.VERIFY_EMAIL.RESEND_BUTTON }} 
            </div>
        </div>
    `,
})
export class BluiVerifyEmailComponent {
    @Input() verificationCode: string;
    @Input() email: string;

    @Output() verificationCodeChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() advance: EventEmitter<void> = new EventEmitter<void>();

    verificationCodeFormControl: FormControl;
    translate: BluiAuthTranslations;

    constructor(
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiRegisterService: BluiRegisterUIService,
        private readonly _bluiSecurityService: BluiAuthSecurityService,
        private readonly _bluiErrorDialogService: BluiCreateAccountErrorDialogService
    ) {}

    ngOnInit(): void {
        this.translate = this._bluiAuthConfig.getTranslations();
        this.verificationCodeFormControl = new FormControl(this.verificationCode, Validators.required);
    }

    sendVerificationEmail(): void {
        this._bluiSecurityService.setLoading(true);
        this._bluiRegisterService
            .requestRegistrationCode(this.email)
            .then(() => {
                this._bluiSecurityService.setLoading(false);
            })
            .catch((data: ErrorDialogData) => {
                this._bluiErrorDialogService.openDialog(data);
                this._bluiSecurityService.setLoading(false);
            });
    }

    updateCode(code: string): void {
        this.verificationCodeChange.emit(code);
    }
}
