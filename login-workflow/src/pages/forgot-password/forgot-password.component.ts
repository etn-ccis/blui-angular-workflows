import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { PxbAuthUIService } from '../../services/api';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { PxbForgotPasswordErrorDialogService } from '../../services/dialog/forgot-password-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { PxbAuthTranslations } from '../../translations/auth-translations';
import { EmailFieldComponent } from '../../components/email-field/email-field.component';

@Component({
    selector: 'pxb-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class PxbForgotPasswordComponent implements OnInit {
    @Input() customEmailValidator: ValidatorFn;
    @ViewChild(EmailFieldComponent) emailFieldComponent: EmailFieldComponent;

    email: string;
    emailFormControl: FormControl;
    matcher = new AuthErrorStateMatcher();
    passwordResetSuccess = false;
    successDescriptionMessage: string;
    translate: PxbAuthTranslations;

    constructor(
        private readonly _router: Router,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbAuthUIActionsService: PxbAuthUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbForgotPasswordDialogService: PxbForgotPasswordErrorDialogService
    ) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
    }

    ngAfterViewInit(): void {
        this.emailFormControl = this.emailFieldComponent.emailFormControl;
    }

    navigateToLogin(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    getSupportByPhone(): string {
        const phone = this.translate.CONTACT_SUPPORT.PHONE_NUMBER || this._pxbAuthConfig.contactPhone;
        return this.translate.FORGOT_PASSWORD.CONTACT_SUPPORT_BY_PHONE(phone);
    }

    hasValidEmail(): boolean {
        return this.emailFormControl && this.emailFormControl.valid;
    }

    resetPassword(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbAuthUIActionsService
            .forgotPassword(this.email)
            .then(() => {
                this.passwordResetSuccess = true;
                void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.FORGOT_PASSWORD}`]);
                this._pxbSecurityService.setLoading(false);
            })
            .catch((data: ErrorDialogData) => {
                this._pxbForgotPasswordDialogService.openDialog(data);
                this._pxbSecurityService.setLoading(false);
            });
    }
}
