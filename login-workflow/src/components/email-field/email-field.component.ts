import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { PXB_LOGIN_VALIDATOR_ERROR_NAME, PxbAuthConfig } from '../../services/config/auth-config';
import { PxbAuthTranslations } from '../../translations/auth-translations';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { PxbFormsService } from '../../services/forms/forms.service';
import { AuthErrorStateMatcher } from '../../util/matcher';

@Component({
    selector: 'pxb-email-field',
    styles: [
        `
            mat-form-field {
                width: 100%;
                margin-bottom: 24px;
            }
        `,
    ],
    template: `
        <mat-form-field appearance="fill">
            <mat-label>{{ translate().GENERAL.EMAIL_FORM_LABEL }}</mat-label>
            <input
                id="pxb-email"
                name="email"
                type="email"
                matInput
                autocomplete="off"
                (ngModelChange)="edit.emit(emailFormControl.value)"
                (focus)="touchedIdField = true; idFieldActive = true"
                (blur)="idFieldActive = false"
                [formControl]="emailFormControl"
                [errorStateMatcher]="matcher"
                (keyup.enter)="enter.emit()"
            />
            <mat-error
                *ngIf="
                    isEmailFormDirty() &&
                    emailFormControl.hasError('email') &&
                    !emailFormControl.hasError('required') &&
                    !emailFormControl.hasError(customErrorName)
                "
                [innerHTML]="translate().GENERAL.EMAIL_INVALID_ERROR"
            >
            </mat-error>
            <mat-error
                *ngIf="isEmailFormDirty() && emailFormControl.hasError('required')"
                [innerHTML]="translate().GENERAL.IS_REQUIRED_ERROR(translate().GENERAL.EMAIL_FORM_LABEL)"
            >
            </mat-error>
            <mat-error
                *ngIf="isEmailFormDirty() && emailFormControl.hasError(customErrorName)"
                [innerHTML]="emailFormControl.errors[customErrorName].message"
            >
            </mat-error>
        </mat-form-field>
    `,
})
export class EmailFieldComponent implements OnInit {
    @Input() customEmailValidator: ValidatorFn;
    @Input() useRememberMe = false;
    @Output() edit: EventEmitter<string> = new EventEmitter<string>();
    @Output() enter: EventEmitter<void> = new EventEmitter<void>();

    emailFormControl: FormControl;
    idFieldActive: boolean;
    touchedIdField: boolean;

    matcher = new AuthErrorStateMatcher();
    customErrorName = PXB_LOGIN_VALIDATOR_ERROR_NAME;

    constructor(
        public pxbFormsService: PxbFormsService,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbSecurityService: PxbAuthSecurityService
    ) {}

    ngOnInit(): void {
        const emailValidators = [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
        ];
        if (this.customEmailValidator || this._pxbAuthConfig.customEmailValidator) {
            emailValidators.push(this.customEmailValidator || this._pxbAuthConfig.customEmailValidator);
        }
        this.emailFormControl = new FormControl(
            this.useRememberMe ? this._pxbSecurityService.getSecurityState().rememberMeDetails.email : '',
            emailValidators
        );
    }

    isEmailFormDirty(): boolean {
        return (
            !this.idFieldActive && this.touchedIdField && (this.emailFormControl.dirty || this.emailFormControl.touched)
        );
    }

    translate(): PxbAuthTranslations {
        return this._pxbAuthConfig.getTranslations();
    }
}
