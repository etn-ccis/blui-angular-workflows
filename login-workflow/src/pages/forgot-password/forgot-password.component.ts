import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { BluiAuthUIService } from '../../services/api';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { BluiAuthConfig } from '../../services/config/auth-config';
import { BluiAuthSecurityService } from '../../services/state/auth-security.service';
import { BluiForgotPasswordErrorDialogService } from '../../services/dialog/forgot-password-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { BluiAuthTranslations } from '../../translations/auth-translations';
import { EmailFieldComponent } from '../../components/email-field/email-field.component';

@Component({
    selector: 'blui-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class BluiForgotPasswordComponent implements OnInit {
    @Input() customEmailValidator: ValidatorFn;
    @ViewChild(EmailFieldComponent) emailFieldComponent: EmailFieldComponent;

    email: string;
    emailFormControl: FormControl;
    matcher = new AuthErrorStateMatcher();
    passwordResetSuccess = false;
    successDescriptionMessage: string;
    translate: BluiAuthTranslations;

    constructor(
        private readonly _router: Router,
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiAuthUIActionsService: BluiAuthUIService,
        private readonly _bluiSecurityService: BluiAuthSecurityService,
        private readonly _bluiForgotPasswordDialogService: BluiForgotPasswordErrorDialogService
    ) {}

    ngOnInit(): void {
        this.translate = this._bluiAuthConfig.getTranslations();
    }

    ngAfterViewInit(): void {
        this.emailFormControl = this.emailFieldComponent.emailFormControl;
    }

    navigateToLogin(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    getSupportByPhone(): string {
        const phone = this.translate.CONTACT_SUPPORT.PHONE_NUMBER || this._bluiAuthConfig.contactPhone;
        return this.translate.FORGOT_PASSWORD.CONTACT_SUPPORT_BY_PHONE(phone);
    }

    hasValidEmail(): boolean {
        return this.emailFormControl && this.emailFormControl.valid;
    }

    resetPassword(): void {
        this._bluiSecurityService.setLoading(true);
        this._bluiAuthUIActionsService
            .forgotPassword(this.email)
            .then(() => {
                this.passwordResetSuccess = true;
                void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.FORGOT_PASSWORD}`]);
                this._bluiSecurityService.setLoading(false);
            })
            .catch((data: ErrorDialogData) => {
                this._bluiForgotPasswordDialogService.openDialog(data);
                this._bluiSecurityService.setLoading(false);
            });
    }
}
