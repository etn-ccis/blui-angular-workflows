import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthErrorStateMatcher } from '../../../../util/matcher';
import { PxbAuthConfig } from './../../../../services/config/auth-config';

import { PxbAuthTranslations } from '../../../../translations/auth-translations';

@Component({
    selector: 'pxb-create-account-provide-email-step',
    template: `
        <div class="mat-title pxb-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.ENTER_EMAIL.TITLE"></div>
        <p
            class="mat-body-1"
            style="margin-bottom: 24px;"
            [innerHTML]="translate.CREATE_ACCOUNT.ENTER_EMAIL.INSTRUCTIONS"
        ></p>
        <mat-divider class="pxb-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
        <div class="pxb-auth-full-height">
            <form>
                <mat-form-field appearance="fill" style="width: 100%;">
                    <mat-label>{{ translate.GENERAL.EMAIL_FORM_LABEL }}</mat-label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        matInput
                        [formControl]="emailFormControl"
                        (ngModelChange)="updateEmail(emailFormControl.value)"
                        [errorStateMatcher]="emailMatcher"
                        (keyup.enter)="advance.emit(true)"
                    />
                    <mat-error
                        *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')"
                        [innerHTML]="translate.GENERAL.EMAIL_INVALID_ERROR"
                    >
                    </mat-error>
                    <mat-error
                        *ngIf="emailFormControl.hasError('required')"
                        [innerHTML]="translate.GENERAL.IS_REQUIRED_ERROR(translate.GENERAL.EMAIL_FORM_LABEL)"
                    >
                    </mat-error>
                </mat-form-field>
            </form>
        </div>
    `,
})
export class PxbProvideEmailComponent implements OnInit {
    @Input() email: string;
    @Input() isValidEmail: boolean;

    @Output() emailChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() isValidEmailChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() advance: EventEmitter<boolean> = new EventEmitter<boolean>();

    emailMatcher = new AuthErrorStateMatcher();
    emailFormControl: FormControl;
    translate: PxbAuthTranslations;

    constructor(private readonly _pxbAuthConfig: PxbAuthConfig) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
        const emailValidators = [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
        ];
        this.emailFormControl = new FormControl(this.email, emailValidators);
    }

    updateEmail(email: string): void {
        this.emailChange.emit(email);
        this.isValidEmailChange.emit(this.emailFormControl.valid);
    }
}
