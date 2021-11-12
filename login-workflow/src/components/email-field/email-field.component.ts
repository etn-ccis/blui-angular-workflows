import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { BLUI_LOGIN_VALIDATOR_ERROR_NAME, BluiAuthConfig } from '../../services/config/auth-config';
import { BluiAuthTranslations } from '../../translations/auth-translations';
import { BluiAuthSecurityService } from '../../services/state/auth-security.service';
import { AuthErrorStateMatcher } from '../../util/matcher';

@Component({
    selector: 'blui-email-field',
    styles: [
        `
            mat-form-field {
                width: 100%;
                margin-bottom: 24px;
            }

            @media only screen and (max-width: 600px) {
                mat-form-field {
                    margin-bottom: 16px;
                }
            }
        `,
    ],
    template: `
        <mat-form-field appearance="fill">
            <mat-label>{{ translate().GENERAL.EMAIL_FORM_LABEL }}</mat-label>
            <input
                id="blui-email"
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
                    !manualErrorMessage &&
                    isEmailFormDirty() &&
                    emailFormControl.hasError('email') &&
                    !emailFormControl.hasError('required') &&
                    !emailFormControl.hasError(customErrorName)
                "
                [innerHTML]="translate().GENERAL.EMAIL_INVALID_ERROR"
            >
            </mat-error>
            <mat-error
                *ngIf="!manualErrorMessage && isEmailFormDirty() && emailFormControl.hasError('required')"
                [innerHTML]="translate().GENERAL.IS_REQUIRED_ERROR(translate().GENERAL.EMAIL_FORM_LABEL)"
            >
            </mat-error>
            <mat-error
                *ngIf="!manualErrorMessage && isEmailFormDirty() && emailFormControl.hasError(customErrorName)"
                [innerHTML]="emailFormControl.errors[customErrorName].message"
            >
            </mat-error>
            <mat-error *ngIf="manualErrorMessage" [innerHTML]="manualErrorMessage"> </mat-error>
        </mat-form-field>
    `,
})
export class EmailFieldComponent implements OnInit {
    @Input() customEmailValidator: ValidatorFn;
    @Input() rememberLoginEmail = false;
    @Input() manualErrorMessage: string;
    @Input() rememberRegistrationEmail = false;
    @Output() edit: EventEmitter<string> = new EventEmitter<string>();
    @Output() enter: EventEmitter<void> = new EventEmitter<void>();

    emailFormControl: FormControl;
    idFieldActive: boolean;
    touchedIdField: boolean;

    matcher = new AuthErrorStateMatcher();
    customErrorName = BLUI_LOGIN_VALIDATOR_ERROR_NAME;

    constructor(
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiSecurityService: BluiAuthSecurityService
    ) {}

    ngOnInit(): void {
        const emailValidators = [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
        ];
        if (this.customEmailValidator || this._bluiAuthConfig.customEmailValidator) {
            emailValidators.push(this.customEmailValidator || this._bluiAuthConfig.customEmailValidator);
        }
        this.emailFormControl = new FormControl(this.showEmail(), emailValidators);
    }

    ngOnChanges(): void {
        this.matcher.setManualError(this.manualErrorMessage);
    }

    showEmail(): string {
        if (this.rememberLoginEmail) {
            return this._bluiSecurityService.getSecurityState().rememberMeDetails.email;
        } else if (this.rememberRegistrationEmail) {
            return this._bluiSecurityService.getSecurityState().registrationEmail;
        }
        return '';
    }

    isEmailFormDirty(): boolean {
        return (
            !this.idFieldActive && this.touchedIdField && (this.emailFormControl.dirty || this.emailFormControl.touched)
        );
    }

    translate(): BluiAuthTranslations {
        return this._bluiAuthConfig.getTranslations();
    }
}
