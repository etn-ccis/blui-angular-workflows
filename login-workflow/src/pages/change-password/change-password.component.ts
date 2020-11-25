import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { PxbAuthUIService } from '../../services/api/auth-ui.service';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { LOGIN_ROUTE } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PasswordRequirement } from '../../components/password-strength-checker/pxb-password-strength-checker.component';
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
    host: {
        class: 'pxb-change-password',
    },
})
export class PxbChangePasswordComponent {
    @Input() successTitle = 'Password Changed';
    @Input() successDescription =
        "Your password was successfully updated! To ensure your account's security, you will need to log in to the application with your updated credentials.";

    passwordFormGroup: FormGroup;
    errorMatcher = new CrossFieldErrorMatcher();

    passwordRequirements: PasswordRequirement[];

    isLoading = false;

    newPasswordVisible = false;
    currentPasswordVisible = false;
    confirmPasswordVisible = false;

    passesStrengthCheck = false;
    confirmPasswordFocused = false;
    passwordChangeSuccess = false;

    constructor(
        private readonly _router: Router,
        private readonly _formBuilder: FormBuilder,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbAuthUIService: PxbAuthUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbChangePasswordDialogService: PxbChangePasswordDialogService,
        private readonly _pxbChangePasswordErrorDialogService: PxbChangePasswordErrorDialogService
    ) {
        this.passwordRequirements = this._pxbAuthConfig.passwordRequirements;
        this.passwordFormGroup = this._formBuilder.group(
            {
                currentPassword: ['', Validators.required],
                newPassword: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: this._passwordsMatch,
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

    closeDialog(): void {
        this._pxbChangePasswordDialogService.closeDialog();
    }

    done(): void {
        this.closeDialog();
        void this._router.navigate([`${this._pxbAuthConfig.authRoute}/${LOGIN_ROUTE}`]);
    }

    changePassword(): void {
        const oldPassword = this.passwordFormGroup.value.currentPassword;
        const newPassword = this.passwordFormGroup.value.newPassword;
        this.isLoading = true;
        this._pxbAuthUIService
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

    allowPasswordChange(): boolean {
        return this.passwordFormGroup.value.currentPassword && this.passesStrengthCheck && this.passwordFormGroup.valid;
    }

    private _passwordsMatch(group: FormGroup): any {
        if (group.value.newPassword !== group.value.confirmPassword) {
            return { passwordsDoNotMatch: true };
        }
    }
}
