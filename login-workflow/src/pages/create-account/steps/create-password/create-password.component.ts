import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { PxbAuthConfig } from '../../../../services/config/auth-config';
import { PxbFormsService } from '../../../../services/forms/forms.service';
import { PasswordRequirement } from '../../../../components/password-strength-checker/pxb-password-strength-checker.component';
import { PxbAuthTranslations } from '../../../../translations/auth-translations';
import { PasswordFieldComponent } from '../../../../components/password-field/password-field.component';

@Component({
    selector: 'pxb-create-account-create-password-step',
    template: `
        <div class="mat-title pxb-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.CREATE_PASSWORD.TITLE"></div>
        <p
            class="mat-body-1"
            style="margin-bottom: 24px;"
            [innerHTML]="translate.CREATE_ACCOUNT.CREATE_PASSWORD.INSTRUCTIONS"
        ></p>
        <mat-divider class="pxb-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
        <div class="pxb-auth-full-height">
            <form>
                <pxb-password-field #passwordField (enter)="focusConfirmPassword()"></pxb-password-field>
                <pxb-password-strength-checker
                    [(meetsRequirements)]="passesStrengthCheck"
                    [formValue]="passwordFormControl?.value"
                    [requirements]="passwordRequirements"
                >
                </pxb-password-strength-checker>
                <pxb-password-field
                    #confirmPasswordField
                    [label]="translate.GENERAL.CONFIRM_PASSWORD_FORM_LABEL"
                    [shouldMatch]="passwordFormControl"
                    [(passwordsMatch)]="passwordsMatch"
                    (edit)="updatePassword($event)"
                    (enter)="advance.emit()"
                >
                </pxb-password-field>
            </form>
        </div>
    `,
})
export class PxbCreatePasswordComponent implements OnInit {
    @Input() password: string;
    @Input() passwordMeetsRequirements: boolean;

    @Output() passwordChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() passwordMeetsRequirementsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() advance: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('passwordField') passwordFieldComponent: PasswordFieldComponent;
    @ViewChild('confirmPasswordField') confirmPasswordFieldComponent: PasswordFieldComponent;

    passwordsMatch = false;
    newPasswordVisible = false;
    passesStrengthCheck = false;
    confirmPasswordVisible = false;
    confirmPasswordFocused = false;

    passwordFormControl: FormControl;
    confirmPasswordFormControl: FormControl;

    passwordRequirements: PasswordRequirement[];
    translate: PxbAuthTranslations;

    constructor(
        private readonly _ref: ChangeDetectorRef,
        private readonly _formBuilder: FormBuilder,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbFormsService: PxbFormsService
    ) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
        this.passwordRequirements = this._pxbAuthConfig.getPasswordRequirements();
        setTimeout(() => {
            this.passwordMeetsRequirements = false;
            this.passwordMeetsRequirementsChange.emit(false);
        });
    }

    ngAfterViewInit(): void {
        this.passwordFormControl = this.passwordFieldComponent.passwordFormControl;
        this.confirmPasswordFormControl = this.confirmPasswordFieldComponent.passwordFormControl;
        this._ref.detectChanges();
    }

    updatePassword(newPassword: string): void {
        this.password = newPassword;
        this.passwordChange.emit(newPassword);
        this.passwordMeetsRequirements = this.hasValidPasswords();
        this.passwordMeetsRequirementsChange.emit(this.passwordMeetsRequirements);
    }

    hasValidPasswords(): boolean {
        return this.passwordsMatch && this.passesStrengthCheck;
    }

    focusConfirmPassword(): void {
        this._pxbFormsService.advanceToNextField(this.confirmPasswordFieldComponent.passwordInputElement);
    }
}
