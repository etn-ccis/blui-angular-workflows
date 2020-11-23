import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PasswordRequirement } from '../../../../components/password-strength-checker/pxb-password-strength-checker.component';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PxbAuthConfig } from '../../../../services/config/auth-config';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}

@Component({
    selector: 'pxb-create-account-create-password-step',
    template: `
        <div class="mat-title pxb-auth-title">Create Password</div>
        <p class="mat-body-1" style="margin-bottom: 24px;">
            Please select a password. Make sure that your password meets the necessary complexity requirements outlined
            below.
        </p>
        <mat-divider class="pxb-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
        <div class="pxb-auth-full-height">
            <form [formGroup]="passwordFormGroup">
                <mat-form-field appearance="fill" style="width: 100%;">
                    <mat-label>Password</mat-label>
                    <input
                        id="password"
                        name="password"
                        matInput
                        placeholder="Password"
                        required
                        formControlName="newPassword"
                        [type]="newPasswordVisible ? 'text' : 'password'"
                        (ngModelChange)="updatePassword(passwordFormGroup.value.newPassword)"
                    />
                    <button mat-icon-button matSuffix (click)="toggleNewPasswordVisibility()">
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
                    <mat-label>Confirm Password</mat-label>
                    <input
                        id="confirm"
                        name="confirm"
                        matInput
                        placeholder="Confirm Password"
                        required
                        formControlName="confirmPassword"
                        [type]="confirmPasswordVisible ? 'text' : 'password'"
                        (focus)="confirmPasswordFocused = true"
                        (blur)="confirmPasswordFocused = false"
                        (ngModelChange)="updatePassword(passwordFormGroup.value.confirmPassword)"
                        [errorStateMatcher]="errorMatcher"
                    />
                    <button mat-icon-button matSuffix (click)="toggleConfirmPasswordVisibility()">
                        <mat-icon>{{ confirmPasswordVisible ? 'visibility' : 'visibility_off' }}</mat-icon>
                    </button>
                    <mat-error *ngIf="!confirmPasswordFocused && passwordFormGroup.hasError('passwordsDoNotMatch')"
                        >Passwords do not match
                    </mat-error>
                </mat-form-field>
            </form>
        </div>
    `,
})
export class PxbCreateAccountCreatePasswordComponent {
    @Input() password: string;
    @Input() passwordMeetsRequirements: boolean;

    @Output() passwordChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() passwordMeetsRequirementsChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    newPasswordVisible = false;
    passesStrengthCheck = false;
    confirmPasswordVisible = false;
    confirmPasswordFocused = false;

    passwordFormGroup: FormGroup;
    errorMatcher = new CrossFieldErrorMatcher();
    passwordRequirements: PasswordRequirement[];

    constructor(private readonly _pxbAuthConfig: PxbAuthConfig, private readonly _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.passwordRequirements = this._pxbAuthConfig.passwordRequirements;
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
