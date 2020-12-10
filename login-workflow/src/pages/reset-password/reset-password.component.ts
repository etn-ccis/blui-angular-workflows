import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbAuthUIService } from '../../services/api/auth-ui.service';
import { LOGIN_ROUTE } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbResetPasswordErrorDialogService } from '../../services/dialog/reset-password-error-dialog.service';
import { PasswordRequirement } from '../../components/password-strength-checker/pxb-password-strength-checker.component';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { PxbFormsService } from '../../services/forms/forms.service';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}

@Component({
    selector: 'pxb-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class PxbResetPasswordComponent implements OnInit {
    @ViewChild('pxbConfirm') confirmInputElement: ElementRef;
    @Input() successTitle = 'Your password was successfully reset.';
    @Input() successDescription =
        "Your password was successfully updated! To ensure your account's security, you will need to log in to the application with your updated credentials.";
    isValidResetCode = false;
    passwordResetSuccess = false;
    passwordFormGroup: FormGroup;
    newPasswordVisible = false;
    confirmPasswordVisible = false;
    errorMatcher = new CrossFieldErrorMatcher();
    isLoading = true;
    passesStrengthCheck = false;
    passwordRequirements: PasswordRequirement[];

    constructor(
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _router: Router,
        private readonly _pxbAuthUIService: PxbAuthUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _formBuilder: FormBuilder,
        private readonly _pxbErrorDialogService: PxbResetPasswordErrorDialogService,
        public pxbFormsService: PxbFormsService
    ) {
        this._pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
        });

        this.passwordFormGroup = this._formBuilder.group(
            {
                newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: this.checkPasswords,
            }
        );
    }

    ngOnInit(): void {
        this.verifyResetCode();
        this.passwordRequirements = this._pxbAuthConfig.passwordRequirements;
    }

    verifyResetCode(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbAuthUIService
            .verifyResetCode()
            .then(() => {
                this.isValidResetCode = true;
                this._pxbSecurityService.setLoading(false);
            })
            .catch(() => {
                this.isValidResetCode = false;
                this._pxbSecurityService.setLoading(false);
            });
    }

    toggleNewPasswordVisibility(): void {
        this.newPasswordVisible = !this.newPasswordVisible;
    }

    toggleConfirmPasswordVisibility(): void {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }

    checkPasswords(group: FormGroup): any {
        const pass = group.get('newPassword').value;
        const confirmPass = group.get('confirmPassword').value;
        return pass === confirmPass ? null : { passwordsDoNotMatch: true };
    }

    isPasswordGroupValid(): boolean {
        return (
            this.passwordFormGroup.get('newPassword').value &&
            this.passesStrengthCheck &&
            this.passwordFormGroup.get('confirmPassword').value &&
            this.passwordFormGroup.valid
        );
    }

    done(): void {
        this.navigateToLogin();
        this.passwordResetSuccess = false;
        this.passwordFormGroup.reset();
    }

    navigateToLogin(): void {
        void this._router.navigate([`${this._pxbAuthConfig.authRoute}/${LOGIN_ROUTE}`]);
    }

    resetPassword(): void {
        const password = this.passwordFormGroup.value.confirmPassword;
        this._pxbSecurityService.setLoading(true);
        void this._pxbAuthUIService
            .setPassword(password)
            .then(() => {
                this.passwordResetSuccess = true;
                this._pxbSecurityService.setLoading(false);
            })
            .catch((data: ErrorDialogData) => {
                this._pxbSecurityService.setLoading(false);
                this._pxbErrorDialogService.openDialog(data);
            });
    }
}
