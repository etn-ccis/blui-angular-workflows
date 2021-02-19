import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbAuthTranslations } from '../../translations/auth-translations';
import { CrossFieldErrorMatcher } from '../../util/matcher';

@Component({
    selector: 'pxb-password-field',
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
                #pxbPasswordField
                name="password"
                autocomplete="off"
                (ngModelChange)="edit.emit(passwordFormControl.value)"
                [type]="isPasswordVisible ? 'text' : 'password'"
                [formControl]="passwordFormControl"
                [errorStateMatcher]="matcher"
                (keydown.enter)="enter.emit()"
            />
            <button type="button" mat-icon-button matSuffix (click)="togglePasswordVisibility()">
                <mat-icon>{{ isPasswordVisible ? 'visibility' : 'visibility_off' }}</mat-icon>
            </button>
            <mat-error
                *ngIf="passwordFormControl.hasError('mismatch')"
                [innerHTML]="translate().GENERAL.PASSWORD_MISMATCH_ERROR"
            ></mat-error>
        </mat-form-field>
    `,
})
export class PasswordFieldComponent implements OnInit {
    @Input() label: string;
    @Input() shouldMatch: FormControl;
    @Input() passwordsMatch: boolean;

    @Output() passwordsMatchChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() enter: EventEmitter<void> = new EventEmitter<void>();
    @Output() edit: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('pxbPasswordField') passwordInputElement: ElementRef;

    isPasswordVisible = false;
    passwordFormControl: FormControl;
    matcher = new CrossFieldErrorMatcher();

    constructor(private readonly _pxbAuthConfig: PxbAuthConfig) {}

    ngOnInit(): void {
        this.passwordFormControl = new FormControl('', [this._passwordsMatchValidator()]);
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

    translate(): PxbAuthTranslations {
        return this._pxbAuthConfig.getTranslations();
    }

    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
}
