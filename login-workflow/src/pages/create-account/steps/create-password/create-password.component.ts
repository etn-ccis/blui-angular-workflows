import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PxbAuthConfig } from '../../../../services/config/auth-config';
import { PxbFormsService } from '../../../../services/forms/forms.service';

import { PasswordRequirement } from '../../../../components/password-strength-checker/pxb-password-strength-checker.component';

import { CrossFieldErrorMatcher } from '../../../../util/matcher';
import { makeEverythingUnique } from '../../../../util/filters';

import { PxbAuthTranslations } from '../../../../translations/auth-translations';

@Component({
    selector: 'pxb-create-account-create-password-step',
    template: `
        <div class="mat-title pxb-auth-title">{{ translate.CREATE_ACCOUNT.CREATE_PASSWORD.TITLE }}</div>
        <p class="mat-body-1" style="margin-bottom: 24px;">
            {{ translate.CREATE_ACCOUNT.CREATE_PASSWORD.INSTRUCTIONS }}
        </p>
        <mat-divider class="pxb-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
        <div class="pxb-auth-full-height">
            <form [formGroup]="passwordFormGroup">
                <mat-form-field appearance="fill" style="width: 100%;">
                    <mat-label>{{ translate.GENERAL.PASSWORD_FORM_LABEL }}</mat-label>
                    <input
                        id="pxb-password"
                        name="password"
                        matInput
                        [placeholder]="translate.GENERAL.PASSWORD_FORM_LABEL"
                        required
                        formControlName="newPassword"
                        [type]="newPasswordVisible ? 'text' : 'password'"
                        (ngModelChange)="updatePassword(passwordFormGroup.value.newPassword)"
                        (keyup.enter)="pxbFormsService.advanceToNextField(confirmInputElement)"
                    />
                    <button type="button" mat-icon-button matSuffix (click)="toggleNewPasswordVisibility()">
                        <mat-icon>{{ newPasswordVisible ? 'visibility' : 'visibility_off' }}</mat-icon>
                    </button>
                </mat-form-field>
                <pxb-password-strength-checker
                    [requirements]="passwordRequirements"
                    [formValue]="passwordFormGroup.value.newPassword"
                    [(meetsRequirements)]="passesStrengthCheck"
                >
                </pxb-password-strength-checker>
                <mat-form-field appearance="fill" style="width: 100%;">
                    <mat-label>{{ translate.GENERAL.CONFIRM_PASSWORD_FORM_LABEL }}</mat-label>
                    <input
                        #pxbConfirm
                        id="pxb-confirm"
                        name="confirm"
                        matInput
                        [placeholder]="translate.GENERAL.CONFIRM_PASSWORD_FORM_LABEL"
                        required
                        formControlName="confirmPassword"
                        [type]="confirmPasswordVisible ? 'text' : 'password'"
                        (focus)="confirmPasswordFocused = true"
                        (blur)="confirmPasswordFocused = false"
                        (ngModelChange)="updatePassword(passwordFormGroup.value.confirmPassword)"
                        [errorStateMatcher]="errorMatcher"
                        (keyup.enter)="advance.emit(true)"
                    />
                    <button type="button" mat-icon-button matSuffix (click)="toggleConfirmPasswordVisibility()">
                        <mat-icon>{{ confirmPasswordVisible ? 'visibility' : 'visibility_off' }}</mat-icon>
                    </button>
                    <mat-error *ngIf="!confirmPasswordFocused && passwordFormGroup.hasError('passwordsDoNotMatch')"
                        >{{ translate.GENERAL.PASSWORD_MISMATCH_ERROR }}
                    </mat-error>
                </mat-form-field>
            </form>
        </div>
    `,
})
export class PxbCreatePasswordComponent implements OnInit {
    @Input() password: string;
    @Input() passwordMeetsRequirements: boolean;

    @Output() passwordChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() passwordMeetsRequirementsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() advance: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('pxbConfirm') confirmInputElement: ElementRef;

    newPasswordVisible = false;
    passesStrengthCheck = false;
    confirmPasswordVisible = false;
    confirmPasswordFocused = false;

    passwordFormGroup: FormGroup;
    errorMatcher = new CrossFieldErrorMatcher();
    passwordRequirements: PasswordRequirement[];

    translate: PxbAuthTranslations;

    constructor(
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _formBuilder: FormBuilder,
        public pxbFormsService: PxbFormsService
    ) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
        this.passwordRequirements = makeEverythingUnique(this._pxbAuthConfig.passwordRequirements, 'description');
        this.passwordFormGroup = this._formBuilder.group(
            {
                newPassword: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: this._checkPasswords,
            }
        );
        setTimeout(() => {
            this.passwordMeetsRequirements = false;
            this.passwordMeetsRequirementsChange.emit(false);
        });
    }

    toggleNewPasswordVisibility(): void {
        this.newPasswordVisible = !this.newPasswordVisible;
    }

    toggleConfirmPasswordVisibility(): void {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }

    updatePassword(newPassword: string): void {
        this.password = newPassword;
        this.passwordChange.emit(newPassword);
        this.passwordMeetsRequirements = this._passwordValid();
        this.passwordMeetsRequirementsChange.emit(this._passwordValid());
    }

    private _passwordValid(): boolean {
        return this.passesStrengthCheck && this.passwordFormGroup.valid;
    }

    private _checkPasswords(group: FormGroup): any {
        const pass = group.get('newPassword').value;
        const confirmPass = group.get('confirmPassword').value;
        return pass === confirmPass ? null : { passwordsDoNotMatch: true };
    }
}
