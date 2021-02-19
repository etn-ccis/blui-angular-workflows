import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbAuthUIService } from '../../services/api/auth-ui.service';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbResetPasswordErrorDialogService } from '../../services/dialog/reset-password-error-dialog.service';
import { PasswordRequirement } from '../../components/password-strength-checker/pxb-password-strength-checker.component';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { PxbFormsService } from '../../services/forms/forms.service';
import { isEmptyView } from '../../util/view-utils';
import { PxbAuthTranslations } from '../../translations/auth-translations';
import { PasswordFieldComponent } from '../../components/password-field/password-field.component';

@Component({
    selector: 'pxb-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class PxbResetPasswordComponent implements OnInit {
    @ViewChild('resetLinkErrorTitleVC') resetLinkErrorTitleEl;
    @ViewChild('resetLinkErrorDescVC') resetLinkErrorDescEl;
    @ViewChild('passwordField') passwordFieldComponent: PasswordFieldComponent;
    @ViewChild('confirmPasswordField') confirmPasswordFieldComponent: PasswordFieldComponent;

    isLoading = true;
    passwordsMatch = false;
    isValidResetCode = false;
    passwordResetSuccess = false;
    passesStrengthCheck = false;

    passwordFormControl: FormControl;
    confirmPasswordFormControl: FormControl;

    isEmpty = (el: ElementRef): boolean => isEmptyView(el);

    passwordRequirements: PasswordRequirement[] = [];
    translate: PxbAuthTranslations;

    constructor(
        private readonly _router: Router,
        private readonly _formBuilder: FormBuilder,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbAuthUIService: PxbAuthUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbErrorDialogService: PxbResetPasswordErrorDialogService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        public pxbFormsService: PxbFormsService
    ) {
        this._pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
        });
    }

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
        this.verifyResetCode();
    }

    verifyResetCode(): void {
        this._pxbSecurityService.setLoading(true);
        void this._pxbAuthUIService
            .verifyResetCode()
            .then(() => {
                this.isValidResetCode = true;
                this._pxbSecurityService.setLoading(false);
            })
            .catch(() => {
                this.isValidResetCode = false;
                this._pxbSecurityService.setLoading(false);
            })
            .then(() => {
                this._configurePasswordControls();
            });
    }

    private _configurePasswordControls(): void {
        this._changeDetectorRef.detectChanges();
        this.passwordRequirements = this._pxbAuthConfig.getPasswordRequirements();
        this.passwordFormControl = this.passwordFieldComponent.passwordFormControl;
        this.confirmPasswordFormControl = this.confirmPasswordFieldComponent.passwordFormControl;
    }

    hasValidPasswords(): boolean {
        return this.passwordsMatch && this.passesStrengthCheck;
    }

    done(): void {
        this.navigateToLogin();
    }

    navigateToLogin(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    focusConfirmPassword(): void {
        this.pxbFormsService.advanceToNextField(this.confirmPasswordFieldComponent.passwordInputElement);
    }

    resetPassword(): void {
        const password = this.confirmPasswordFormControl.value;
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
            })
            .then(() => {
                this._changeDetectorRef.detectChanges();
            });
    }
}
