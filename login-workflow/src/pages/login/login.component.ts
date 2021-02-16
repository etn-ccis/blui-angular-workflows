import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { isEmptyView } from '../../util/view-utils';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { PxbAuthUIService } from '../../services/api/auth-ui.service';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbLoginErrorDialogService } from '../../services/dialog/login-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { PxbFormsService } from '../../services/forms/forms.service';
import {LanguageLoaderService} from "../../services/language/language-loader.service";
import {PxbAuthTranslations} from "../../translations/auth-translations";

// TODO: Find a home for this const, perhaps config folder.
export const PXB_LOGIN_VALIDATOR_ERROR_NAME = 'PXB_LOGIN_VALIDATOR_ERROR_NAME';

@Component({
    selector: 'pxb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    host: {
        class: 'pxb-login',
    },
})
export class PxbLoginComponent implements OnInit, AfterViewInit {
    @ViewChild('header', { static: false }) headerEl: ElementRef;
    @ViewChild('footer', { static: false }) footerEl: ElementRef;
    @ViewChild('pxbPassword') passwordInputElement: ElementRef;

    @Input() customEmailValidator: ValidatorFn;
    customErrorName = PXB_LOGIN_VALIDATOR_ERROR_NAME;

    emailFormControl: FormControl;
    passwordFormControl: FormControl;

    isLoading: boolean;
    rememberMe: boolean;

    isPasswordVisible = false;
    debugMode = false;
    idFieldActive = false;
    touchedIdField = false;

    translate: PxbAuthTranslations;

    isEmpty = (el: ElementRef): boolean => isEmptyView(el);

    constructor(
        public pxbAuthConfig: PxbAuthConfig,
        private readonly _router: Router,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _pxbUIActionsService: PxbAuthUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbLoginErrorDialogService: PxbLoginErrorDialogService,
        private readonly _languageLoaderService: LanguageLoaderService,
        public pxbFormsService: PxbFormsService,
    ) {}

    ngOnInit(): void {
        const emailValidators = [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
        ];
        this.translate = this._languageLoaderService.getTranslation();
        if (this.customEmailValidator) {
            emailValidators.push(this.customEmailValidator);
        }
        this.emailFormControl = new FormControl(
            this._pxbSecurityService.getSecurityState().rememberMeDetails.email,
            emailValidators
        );
        this.passwordFormControl = new FormControl('', []);
        this.rememberMe = this._pxbSecurityService.getSecurityState().rememberMeDetails.rememberMe;
        if (this._pxbSecurityService.getSecurityState().isAuthenticatedUser) {
            this.navigateToDefaultRoute();
            return;
        }
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
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
            .catch((data: ErrorDialogData) => {
                this._pxbLoginErrorDialogService.openDialog(data);
                this._pxbSecurityService.onUserNotAuthenticated();
                this._pxbSecurityService.setLoading(false);
            });
    }

    emitRememberMeChange(): void {
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
        void this._router.navigateByUrl(`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.CREATE_ACCOUNT}`);
    }

    contactSupport(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.CONTACT_SUPPORT}`]);
    }

    isValidFormEntries(): boolean {
        return this.passwordFormControl.value && this.emailFormControl.valid;
    }

    isLoginFormDirty(): boolean {
        return (
            !this.idFieldActive && this.touchedIdField && (this.emailFormControl.dirty || this.emailFormControl.touched)
        );
    }
}
