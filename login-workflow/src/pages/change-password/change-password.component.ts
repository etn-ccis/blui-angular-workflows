import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PxbAuthUIService } from '../../services/api';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PasswordRequirement } from '../../components/password-strength-checker/pxb-password-strength-checker.component';
import { PxbChangePasswordDialogService } from './dialog/change-password-dialog.service';
import { PxbChangePasswordErrorDialogService } from '../../services/dialog/change-password-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { PxbFormsService } from '../../services/forms/forms.service';
import { PxbAuthTranslations } from '../../translations/auth-translations';
import { PasswordFieldComponent } from '../../components/password-field/password-field.component';

@Component({
    selector: 'pxb-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    host: {
        class: 'pxb-change-password',
    },
})
export class PxbChangePasswordComponent implements OnInit, AfterViewInit {
    @ViewChild('currentPasswordField') currentPasswordComponent: PasswordFieldComponent;
    @ViewChild('newPasswordField') newPasswordComponent: PasswordFieldComponent;
    @ViewChild('confirmPasswordField') confirmPasswordComponent: PasswordFieldComponent;

    currentPasswordFormControl: FormControl;
    newPasswordFormControl: FormControl;
    confirmPasswordFormControl: FormControl;

    passwordRequirements: PasswordRequirement[];

    isLoading = false;
    passesStrengthCheck = false;
    passwordChangeSuccess = false;
    passwordsMatch = false;

    translate: PxbAuthTranslations;

    constructor(
        private readonly _router: Router,
        private readonly _formBuilder: FormBuilder,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbFormsService: PxbFormsService,
        private readonly _pxbAuthUIService: PxbAuthUIService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbChangePasswordDialogService: PxbChangePasswordDialogService,
        private readonly _pxbChangePasswordErrorDialogService: PxbChangePasswordErrorDialogService
    ) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
        this.passwordRequirements = this._pxbAuthConfig.getPasswordRequirements();
    }

    ngAfterViewInit(): void {
        this.currentPasswordFormControl = this.currentPasswordComponent.passwordFormControl;
        this.newPasswordFormControl = this.newPasswordComponent.passwordFormControl;
        this.confirmPasswordFormControl = this.confirmPasswordComponent.passwordFormControl;
        this._changeDetectorRef.detectChanges();
    }

    closeDialog(): void {
        this._pxbChangePasswordDialogService.closeDialog();
    }

    done(): void {
        this.closeDialog();
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    changePassword(): void {
        const oldPassword = this.currentPasswordFormControl.value;
        const newPassword = this.newPasswordFormControl.value;
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

    focusNewPassword(): void {
        this._pxbFormsService.advanceToNextField(this.newPasswordComponent.passwordInputElement);
    }

    focusConfirmPassword(): void {
        this._pxbFormsService.advanceToNextField(this.confirmPasswordComponent.passwordInputElement);
    }

    allowPasswordChange(): boolean {
        return (
            this.currentPasswordFormControl &&
            this.currentPasswordFormControl.value &&
            this.passwordsMatch &&
            this.passesStrengthCheck
        );
    }
}
