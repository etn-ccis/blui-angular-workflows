import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { BluiAuthConfig } from '../../../../services/config/auth-config';
import { BluiFormsService } from '../../../../services/forms/forms.service';
import { PasswordRequirement } from '../../../../components/password-strength-checker/blui-password-strength-checker.component';
import { BluiAuthTranslations } from '../../../../translations/auth-translations';
import { PasswordFieldComponent } from '../../../../components/password-field/password-field.component';

@Component({
    selector: 'blui-create-account-create-password-step',
    template: `
        <div class="mat-title blui-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.CREATE_PASSWORD.TITLE"></div>
        <p
            class="mat-body-1"
            style="margin-bottom: 24px;"
            [innerHTML]="translate.CREATE_ACCOUNT.CREATE_PASSWORD.INSTRUCTIONS"
        ></p>
        <mat-divider class="blui-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
        <div class="blui-auth-full-height">
            <form>
                <blui-password-field
                    #passwordField
                    id="blui-password"
                    [rememberPassword]="true"
                    (enter)="focusConfirmPassword()"
                ></blui-password-field>
                <blui-password-strength-checker
                    [(meetsRequirements)]="passesStrengthCheck"
                    [formValue]="passwordFormControl?.value"
                    [requirements]="passwordRequirements"
                >
                </blui-password-strength-checker>
                <blui-password-field
                    #confirmPasswordField
                    id="blui-confirm-password"
                    [rememberPassword]="true"
                    [label]="translate.GENERAL.CONFIRM_PASSWORD_FORM_LABEL"
                    [shouldMatch]="passwordFormControl"
                    [(passwordsMatch)]="passwordsMatch"
                    (edit)="updatePassword($event)"
                    (enter)="advance.emit()"
                >
                </blui-password-field>
            </form>
        </div>
    `,
})
export class BluiCreatePasswordComponent implements OnInit {
    @Input() password: string;
    @Input() passwordMeetsRequirements: boolean;

    @Output() passwordChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() passwordMeetsRequirementsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() advance: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('passwordField') passwordFieldComponent: PasswordFieldComponent;
    @ViewChild('confirmPasswordField') confirmPasswordFieldComponent: PasswordFieldComponent;

    passwordsMatch = false;
    passesStrengthCheck = false;

    passwordFormControl: FormControl;
    confirmPasswordFormControl: FormControl;

    passwordRequirements: PasswordRequirement[];
    translate: BluiAuthTranslations;

    constructor(
        private readonly _ref: ChangeDetectorRef,
        private readonly _formBuilder: FormBuilder,
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiFormsService: BluiFormsService
    ) {}

    ngOnInit(): void {
        this.translate = this._bluiAuthConfig.getTranslations();
        this.passwordRequirements = this._bluiAuthConfig.getPasswordRequirements();
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
        this._bluiFormsService.advanceToNextField(this.confirmPasswordFieldComponent.passwordInputElement);
    }
}
