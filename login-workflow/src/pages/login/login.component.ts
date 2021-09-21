import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ValidatorFn } from '@angular/forms';
import { isEmptyView } from '../../util/view-utils';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { PxbAuthUIService } from '../../services/api';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbLoginErrorDialogService } from '../../services/dialog/login-error-dialog.service';
import { PxbFormsService } from '../../services/forms/forms.service';
import { AuthTranslationLanguageCode, PxbAuthTranslations } from '../../translations/auth-translations';
import { EmailFieldComponent } from '../../components/email-field/email-field.component';
import { PasswordFieldComponent } from '../../components/password-field/password-field.component';
import { LoginErrorData } from '../../services/dialog/error-dialog.service';

@Component({
    selector: 'pxb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    host: {
        class: 'pxb-login',
    },
})
export class PxbLoginComponent implements OnInit, AfterViewInit {
    @Input() customEmailValidator: ValidatorFn;

    @ViewChild('header', { static: false }) headerEl: ElementRef;
    @ViewChild('footer', { static: false }) footerEl: ElementRef;
    @ViewChild(EmailFieldComponent) emailFieldComponent: EmailFieldComponent;
    @ViewChild(PasswordFieldComponent) passwordFieldComponent: PasswordFieldComponent;

    emailFormControl: FormControl;
    passwordFormControl: FormControl;

    isLoading: boolean;
    rememberMe: boolean;

    isPasswordVisible = false;
    debugMode = false;

    /* Error Handling */
    errorMessage: string;
    position: 'top' | 'bottom';
    dismissible: boolean;
    showDialog: boolean;
    showCardError: boolean;
    showFormErr: boolean;

    selectedLanguage = 'English';

    isEmpty = (el: ElementRef): boolean => isEmptyView(el);

    constructor(
        public pxbAuthConfig: PxbAuthConfig,
        private readonly _router: Router,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _pxbUIActionsService: PxbAuthUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbLoginErrorDialogService: PxbLoginErrorDialogService,
        public pxbFormsService: PxbFormsService
    ) {}

    ngOnInit(): void {
        this.rememberMe = this._pxbSecurityService.getSecurityState().rememberMeDetails.rememberMe;
        if (this._pxbSecurityService.getSecurityState().isAuthenticatedUser) {
            this.navigateToDefaultRoute();
            return;
        }
    }

    ngAfterViewInit(): void {
        this.emailFormControl = this.emailFieldComponent.emailFormControl;
        this.passwordFormControl = this.passwordFieldComponent.passwordFormControl;
        this._changeDetectorRef.detectChanges();
    }

    toggleDebugMode(): void {
        this.debugMode = !this.debugMode;
    }

    login(): void {
        const email = this.emailFormControl.value;
        const password = this.passwordFormControl.value;
        const rememberMe = Boolean(this.rememberMe);
        this._pxbSecurityService.setLoading(true);
        this._pxbUIActionsService
            .login(email, password, rememberMe)
            .then(() => {
                this._pxbSecurityService.onUserAuthenticated(email, password, rememberMe);
                this.navigateToDefaultRoute();
                this._pxbSecurityService.setLoading(false);
            })
            .catch((errorData: LoginErrorData) => {
                // If a user provides `undefined` rejection data, don't throw an error.
                const rejectionData = errorData || {} as LoginErrorData;
                const mode = rejectionData.mode || ['dialog'];

                if (mode.includes('none')) {
                    this._pxbSecurityService.onUserNotAuthenticated();
                    this._pxbSecurityService.setLoading(false);
                    return;
                }

                this.position = rejectionData.position || 'top';
                this.dismissible = rejectionData.dismissible === undefined ? true : rejectionData.dismissible;
                this.showDialog = mode.includes('dialog');
                this.showCardError = mode.includes('message-box');
                this.showFormErr = mode.includes('form');
                const errorTitle = rejectionData.title || this.translate().LOGIN.ERROR_TITLE;
                this.errorMessage = rejectionData.message || this.translate().LOGIN.INVALID_CREDENTIALS;

                if (this.showCardError) {
                    this.showCardError = true;
                }
                if (this.showDialog) {
                    this._pxbLoginErrorDialogService.openDialog({
                        title: errorTitle,
                        message: this.errorMessage
                    });
                }
                this._pxbSecurityService.onUserNotAuthenticated();
                this._pxbSecurityService.setLoading(false);
            });
    }

    focusPasswordField(): void {
        this.pxbFormsService.advanceToNextField(this.passwordFieldComponent.passwordInputElement);
    }

    toggleRememberMe(): void {
        const rememberMe = this.rememberMe;
        this._pxbSecurityService.updateSecurityState({ rememberMeDetails: { rememberMe } });
    }

    navigateToDefaultRoute(): void {
        void this._router.navigate([AUTH_ROUTES.ON_AUTHENTICATED]);
    }

    forgotPassword(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.FORGOT_PASSWORD}`]);
    }

    testForgotPasswordEmail(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.RESET_PASSWORD}`], {
            queryParams: { code: 'DEADBEEF', email: 'resetPassword@email.com' },
        });
    }

    testInviteRegister(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.CREATE_ACCOUNT_INVITE}`], {
            queryParams: { code: 'DEADBEEF' },
        });
    }

    createAccount(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.CREATE_ACCOUNT}`]);
    }

    contactSupport(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.CONTACT_SUPPORT}`]);
    }

    hasValidFormEntries(): boolean {
        return (
            this.passwordFormControl &&
            this.emailFormControl &&
            this.passwordFormControl.value &&
            this.emailFormControl.valid
        );
    }

    changeLanguage(languageCode: AuthTranslationLanguageCode): void {
        this.pxbAuthConfig.languageCode = languageCode;
    }

    translate(): PxbAuthTranslations {
        return this.pxbAuthConfig.getTranslations();
    }

    clearInputErrorMessage(): void {
        this.errorMessage = '';
    }
}
