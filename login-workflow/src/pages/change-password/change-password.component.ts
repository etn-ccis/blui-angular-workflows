import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PxbAuthUIService } from '../../services/api/auth-ui.service';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PasswordRequirement } from '../../components/password-strength-checker/pxb-password-strength-checker.component';
import { PxbChangePasswordDialogService } from './dialog/change-password-dialog.service';
import { PxbChangePasswordErrorDialogService } from '../../services/dialog/change-password-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { PxbFormsService } from '../../services/forms/forms.service';
import { CrossFieldErrorMatcher } from '../../util/matcher';
import { makeEverythingUnique } from '../../util/filters';
import { PxbAuthTranslations } from '../../translations/auth-translations';

@Component({
    selector: 'pxb-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    host: {
        class: 'pxb-change-password',
    },
})
export class PxbChangePasswordComponent implements OnInit {
    @ViewChild('pxbPassword') passwordInputElement: ElementRef;
    @ViewChild('pxbConfirm') confirmInputElement: ElementRef;

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
    translate: PxbAuthTranslations;

    constructor(
        private readonly _router: Router,
        private readonly _formBuilder: FormBuilder,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbAuthUIService: PxbAuthUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbChangePasswordDialogService: PxbChangePasswordDialogService,
        private readonly _pxbChangePasswordErrorDialogService: PxbChangePasswordErrorDialogService,
        public pxbFormsService: PxbFormsService
    ) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
        this.passwordRequirements = makeEverythingUnique(this._pxbAuthConfig.passwordRequirements, 'description');
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
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
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
            .catch((data: ErrorDialogData) => {
                this.passwordChangeSuccess = false;
                this.isLoading = false;
                this._pxbChangePasswordErrorDialogService.openDialog(data);
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
