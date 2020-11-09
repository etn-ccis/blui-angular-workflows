import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { isEmptyView } from '../../util/view-utils';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../../config/auth-config';
import {
    CONTACT_SUPPORT_ROUTE,
    CREATE_ACCOUNT_INVITE_ROUTE,
    CREATE_ACCOUNT_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE,
} from '../../config/route-names';
import { PxbSecurityService, SecurityContext } from '../../services/state/security.service';
import { PxbAuthUIActionsService } from '../../services/api/auth-ui-actions.service';

// TODO: Find a home for this const, perhaps config folder.
export const PXB_LOGIN_VALIDATOR_ERROR_NAME = 'PXB_LOGIN_VALIDATOR_ERROR_NAME';

@Component({
    selector: 'pxb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class PxbLoginComponent implements AfterViewInit {
    @ViewChild('header', { static: false }) headerEl: ElementRef;
    @ViewChild('footer', { static: false }) footerEl: ElementRef;

    customErrorName = PXB_LOGIN_VALIDATOR_ERROR_NAME;
    @Input() customEmailValidator: ValidatorFn;
    enableDebugMode = false;
    showSelfRegistration = false;

    emailFormControl: FormControl;
    passwordFormControl: FormControl;

    isLoading: boolean;
    rememberMe: boolean;
    matcher = new AuthErrorStateMatcher();
    isEmpty = (el: ElementRef): boolean => isEmptyView(el);
    isPasswordVisible = false;
    debugMode = false;
    securityState: SecurityContext;

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _router: Router,
        private readonly _securityService: PxbSecurityService,
        private readonly _pxbAuthUIActionsService: PxbAuthUIActionsService,
        @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig
    ) {}

    ngOnInit(): void {
        this.enableDebugMode = this._config.allowDebugMode;
        this.showSelfRegistration = this._config.showSelfRegistration;
        this.securityState = this._securityService.getSecurityState();
        this.rememberMe = this.securityState.rememberMeDetails.rememberMe;

        console.log('security state from login: ', this.securityState);

        const emailValidators = [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
        ];
        if (this.customEmailValidator) {
            emailValidators.push(this.customEmailValidator);
        }
        this.emailFormControl = new FormControl(
            this.rememberMe ? this.securityState.rememberMeDetails.email : '',
            emailValidators
        );
        this.passwordFormControl = new FormControl('', []);

        if (this._securityService.getSecurityState().isAuthenticatedUser) {
            this.navigateToDefaultRoute();
            return;
        }
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
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

        this.isLoading = true;
        this._pxbAuthUIActionsService
            .login(email, password, rememberMe)
            .then(() => {
                console.log('login success');
                this._securityService.onUserAuthenticated(email, password, rememberMe);
                this.navigateToDefaultRoute();
                // TODO: Where does the localstorage service get called???
            })
            .catch(() => {
                console.log('login failed');
                this._securityService.onUserNotAuthenticated();
                console.log(this._securityService.getSecurityState());
            })
            .then(() => {
                this.isLoading = false;
            });
    }

    navigateToDefaultRoute(): void {
        void this._router.navigate([this._config.homeRoute]);
    }

    forgotPassword(): void {
        void this._router.navigate([`${this._config.authRoute}/${FORGOT_PASSWORD_ROUTE}`]);
    }

    testForgotPasswordEmail(): void {
        void this._router.navigate([`${this._config.authRoute}/${RESET_PASSWORD_ROUTE}`]);
    }

    testInviteRegister(): void {
        void this._router.navigate([`${this._config.authRoute}/${CREATE_ACCOUNT_INVITE_ROUTE}`]);
    }

    createAccount(): void {
        void this._router.navigate([`${this._config.authRoute}/${CREATE_ACCOUNT_ROUTE}`]);
    }

    contactSupport(): void {
        void this._router.navigate([`${this._config.authRoute}/${CONTACT_SUPPORT_ROUTE}`]);
    }

    isValidFormEntries(): boolean {
        return this.passwordFormControl.value && this.emailFormControl.valid;
    }
}
