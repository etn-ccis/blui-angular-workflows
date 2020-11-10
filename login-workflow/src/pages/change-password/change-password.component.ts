import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PxbAuthUIService } from '../../services/api/auth-ui.service';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { Router } from '@angular/router';
import { LOGIN_ROUTE } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbChangePasswordDialogService } from './dialog/change-password-dialog.service';
import { PxbChangePasswordErrorDialogService } from './dialog/change-password-error-dialog.service';

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
export class PxbChangePasswordComponent {
    @Input() email = 'testemail@email.com';
    @Input() successTitle = 'Password Changed';
    @Input() successDescription =
        "Your password was successfully updated! To ensure your account's security, you will need to log in to the application with your updated credentials.";

    passwordFormGroup: FormGroup;
    errorMatcher = new CrossFieldErrorMatcher();

    upperFlag = false;
    lowerFlag = false;
    isLoading = false;
    passLength = false;
    numberFlag = false;
    specialFlag = false;
    newPasswordVisible = false;
    passwordChangeSuccess = false;
    currentPasswordVisible = false;
    confirmPasswordVisible = false;

    constructor(
        private readonly _router: Router,
        private readonly _authConfig: PxbAuthConfig,
        private readonly _formBuilder: FormBuilder,
        private readonly _pxbUIActionsService: PxbAuthUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbChangePasswordDialogService: PxbChangePasswordDialogService,
        private readonly _pxbChangePasswordErrorDialogService: PxbChangePasswordErrorDialogService
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
        this._pxbChangePasswordDialogService.closeDialog();
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
        void this._router.navigate([`${this._authConfig.authRoute}/${LOGIN_ROUTE}`]);
    }

    changePassword(): void {
        const oldPassword = this.passwordFormGroup.value.currentPassword;
        const newPassword = this.passwordFormGroup.value.newPassword;
        this.isLoading = true;
        this._pxbUIActionsService
            .changePassword(oldPassword, newPassword)
            .then(() => {
                this.passwordChangeSuccess = true;
                this._pxbSecurityService.onUserNotAuthenticated();
                this.isLoading = false;
            })
            .catch(() => {
                this.passwordChangeSuccess = false;
                this.isLoading = false;
                this._pxbChangePasswordErrorDialogService.openDialog();
            });
    }
}
