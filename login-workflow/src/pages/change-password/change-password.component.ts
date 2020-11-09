import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PxbChangePasswordModalService } from './change-password-modal.service';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}

@Component({
    selector: 'pxb-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class PxbChangePasswordComponent implements OnInit {
    @Input() email = 'testemail@email.com';
    @Input() successTitle = 'Password Changed';
    @Input() successDescription =
        "Your password was successfully updated! To ensure your account's security, you will need to log in to the application with your updated credentials.";
    passwordChangeSuccess = false;
    passwordFormGroup: FormGroup;
    currentPasswordVisible = false;
    newPasswordVisible = false;
    confirmPasswordVisible = false;
    errorMatcher = new CrossFieldErrorMatcher();
    passLength = false;
    specialFlag = false;
    numberFlag = false;
    upperFlag = false;
    lowerFlag = false;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _changePasswordModalService: PxbChangePasswordModalService
    ) {
        this.passwordFormGroup = this._formBuilder.group(
            {
                currentPassword: ['', Validators.required],
                newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: this.checkPasswords,
            }
        );
    }

    ngOnInit(): void {}

    toggleCurrentPasswordVisibility(): void {
        this.currentPasswordVisible = !this.currentPasswordVisible;
    }

    toggleNewPasswordVisibility(): void {
        this.newPasswordVisible = !this.newPasswordVisible;
    }

    toggleConfirmPasswordVisibility(): void {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }

    checkPasswordStrength(password: string): void {
        this.passLength = /^.{8,16}$/.test(password);
        this.specialFlag = /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+/.test(password);
        this.numberFlag = /[0-9]/.test(password);
        this.upperFlag = /[A-Z]/.test(password);
        this.lowerFlag = /[a-z]/.test(password);
    }

    checkPasswords(group: FormGroup): any {
        const pass = group.get('newPassword').value;
        const confirmPass = group.get('confirmPassword').value;
        return pass === confirmPass ? null : { passwordsDoNotMatch: true };
    }

    isPasswordGroupValid(): boolean {
        return (
            this.passwordFormGroup.get('newPassword').value &&
            this.passLength &&
            this.specialFlag &&
            this.numberFlag &&
            this.upperFlag &&
            this.lowerFlag &&
            this.passwordFormGroup.get('confirmPassword').value &&
            this.passwordFormGroup.valid
        );
    }

    closeDialog(): void {
        this._changePasswordModalService.closeDialog();
    }

    done(): void {
        this.closeDialog();
        this.passwordChangeSuccess = false;
        this.passwordFormGroup.reset();
        this.passLength = false;
        this.specialFlag = false;
        this.numberFlag = false;
        this.upperFlag = false;
        this.lowerFlag = false;
    }

    changePassword(): void {
        // submit form

        this.passwordChangeSuccess = true;
    }
}
