import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PxbAuthSecurityService } from '../../../../services/state/auth-security.service';
import { PxbCreateAccountErrorDialogService } from '../../dialog/create-account-error-dialog.service';
import { PxbRegisterUIService } from '../../../../services/api/register-ui.service';

@Component({
    selector: 'pxb-create-account-verify-email-step',
    template: `
        <div class="mat-title pxb-auth-title">Verify Email</div>
        <p class="mat-body-1" style="margin-bottom: 24px;">
            A verification code has been sent to the email address you provided. Click the link or enter the code below
            to continue. This code is valid for 30 minutes.
        </p>
        <mat-divider class="pxb-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
        <div class="pxb-auth-full-height">
            <form>
                <mat-form-field appearance="fill" style="width: 100%;">
                    <mat-label>Verification Code</mat-label>
                    <input
                        id="verification"
                        name="verification"
                        matInput
                        [formControl]="verificationCodeFormControl"
                        (ngModelChange)="updateCode(verificationCodeFormControl.value)"
                    />
                    <mat-error *ngIf="verificationCodeFormControl.hasError('required')">
                        Verification code is <strong>required</strong>
                    </mat-error>
                </mat-form-field>
            </form>
            <button
                mat-flat-button
                color="primary"
                style="width: 100%; margin-top: 8px;"
                (click)="sendVerificationEmail()"
            >
                Resend Verification Email
            </button>
        </div>
    `,
})
export class PxbCreateAccountVerifyEmailComponent {
    @Input() verificationCode: string;
    @Input() email: string;

    @Output() verificationCodeChange: EventEmitter<string> = new EventEmitter<string>();

    verificationCodeFormControl: FormControl;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _pxbRegisterService: PxbRegisterUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbErrorDialogService: PxbCreateAccountErrorDialogService
    ) {}

    ngOnInit(): void {
        this.verificationCodeFormControl = new FormControl('', Validators.required);
    }

    sendVerificationEmail(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .requestRegistrationCode(this.email)
            .then(() => {
                this._pxbSecurityService.setLoading(false);
            })
            .catch(() => {
                this._pxbErrorDialogService.openDialog();
                this._pxbSecurityService.setLoading(false);
            });
    }

    updateCode(code: string): void {
        this.verificationCodeChange.emit(code);
    }
}
