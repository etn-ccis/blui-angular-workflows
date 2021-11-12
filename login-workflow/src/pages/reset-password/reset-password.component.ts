import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BluiAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { BluiAuthUIService } from '../../services/api';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { BluiAuthConfig } from '../../services/config/auth-config';
import { BluiResetPasswordErrorDialogService } from '../../services/dialog/reset-password-error-dialog.service';
import { PasswordRequirement } from '../../components/password-strength-checker/blui-password-strength-checker.component';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { BluiFormsService } from '../../services/forms/forms.service';
import { isEmptyView } from '../../util/view-utils';
import { BluiAuthTranslations } from '../../translations/auth-translations';
import { PasswordFieldComponent } from '../../components/password-field/password-field.component';

@Component({
    selector: 'blui-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class BluiResetPasswordComponent implements OnInit {
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
    translate: BluiAuthTranslations;

    constructor(
        private readonly _router: Router,
        private readonly _formBuilder: FormBuilder,
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiAuthUIService: BluiAuthUIService,
        private readonly _bluiSecurityService: BluiAuthSecurityService,
        private readonly _bluiErrorDialogService: BluiResetPasswordErrorDialogService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        public bluiFormsService: BluiFormsService
    ) {
        this._bluiSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
        });
    }

    ngOnInit(): void {
        this.translate = this._bluiAuthConfig.getTranslations();
        this.verifyResetCode();
    }

    verifyResetCode(): void {
        this._bluiSecurityService.setLoading(true);
        void this._bluiAuthUIService
            .verifyResetCode()
            .then(() => {
                this.isValidResetCode = true;
                this._bluiSecurityService.setLoading(false);
                this._configurePasswordControls();
            })
            .catch(() => {
                this.isValidResetCode = false;
                this._bluiSecurityService.setLoading(false);
            });
    }

    private _configurePasswordControls(): void {
        this._changeDetectorRef.detectChanges();
        this.passwordRequirements = this._bluiAuthConfig.getPasswordRequirements();
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
        this.BluiFormsService.advanceToNextField(this.confirmPasswordFieldComponent.passwordInputElement);
    }

    resetPassword(): void {
        const password = this.confirmPasswordFormControl.value;
        this._bluiSecurityService.setLoading(true);
        void this._bluiAuthUIService
            .setPassword(password)
            .then(() => {
                this.passwordResetSuccess = true;
                this._bluiSecurityService.setLoading(false);
            })
            .catch((data: ErrorDialogData) => {
                this._bluiSecurityService.setLoading(false);
                this._bluiErrorDialogService.openDialog(data);
            })
            .then(() => {
                this._changeDetectorRef.detectChanges();
            });
    }
}
