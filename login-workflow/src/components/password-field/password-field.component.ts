import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BluiAuthConfig } from '../../services/config/auth-config';
import { BluiAuthTranslations } from '../../translations/auth-translations';
import { BluiAuthSecurityService } from '../../services/state/auth-security.service';
import { CrossFieldErrorMatcher } from '../../util/matcher';

@Component({
    selector: 'blui-password-field',
    styles: [
        `
            mat-form-field {
                width: 100%;
            }
        `,
    ],
    template: `
        <mat-form-field appearance="fill">
            <mat-label>{{ label || translate().GENERAL.PASSWORD_FORM_LABEL }}</mat-label>
            <input
                matInput
                id="blui-password"
                #bluiPasswordField
                name="password"
                autocomplete="off"
                (ngModelChange)="edit.emit(passwordFormControl.value)"
                [type]="isPasswordVisible ? 'text' : 'password'"
                [formControl]="passwordFormControl"
                [errorStateMatcher]="matcher"
                (keydown.enter)="enter.emit()"
            />
            <button
                id="blui-visibility-icon"
                type="button"
                mat-icon-button
                matSuffix
                (click)="togglePasswordVisibility()"
            >
                <mat-icon>{{ isPasswordVisible ? 'visibility' : 'visibility_off' }}</mat-icon>
            </button>
            <mat-error
                *ngIf="!manualErrorMessage && passwordFormControl.hasError('mismatch')"
                [innerHTML]="translate().GENERAL.PASSWORD_MISMATCH_ERROR"
            ></mat-error>
            <mat-error *ngIf="manualErrorMessage" [innerHTML]="manualErrorMessage"> </mat-error>
        </mat-form-field>
    `,
})
export class PasswordFieldComponent implements OnInit {
    @Input() rememberPassword: false;
    @Input() label: string;
    @Input() shouldMatch: FormControl;
    @Input() passwordsMatch: boolean;
    @Input() manualErrorMessage: string;

    @Output() passwordsMatchChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() enter: EventEmitter<void> = new EventEmitter<void>();
    @Output() edit: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('bluiPasswordField') passwordInputElement: ElementRef;

    isPasswordVisible = false;
    passwordFormControl: FormControl;
    matcher = new CrossFieldErrorMatcher();

    constructor(
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiSecurityService: BluiAuthSecurityService
    ) {}

    ngOnInit(): void {
        const rememberedPassword = this.rememberPassword
            ? this._bluiSecurityService.getSecurityState().registrationPassword
            : '';
        this.passwordFormControl = new FormControl(rememberedPassword ? rememberedPassword : '', [
            this._passwordsMatchValidator(),
        ]);
    }

    ngOnChanges(): void {
        this.matcher.setManualError(this.manualErrorMessage);
    }

    private _passwordsMatchValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            if (!this.shouldMatch) {
                return;
            }
            const passwordsMatch =
                this.shouldMatch && this.shouldMatch.value && control.value === this.shouldMatch.value;
            this.passwordsMatchChange.emit(passwordsMatch);
            if (!passwordsMatch) {
                return { mismatch: { message: '' } };
            }
        };
    }

    translate(): BluiAuthTranslations {
        return this._bluiAuthConfig.getTranslations();
    }

    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
}
