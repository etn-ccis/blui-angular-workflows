import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {Form, FormControl, ValidatorFn, Validators} from '@angular/forms';
import { PxbAuthApiService } from '../../services/api/api.service';
import { PxbAuthStateService } from '../../services/state/state.service';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { isEmptyView } from '../../util/view-utils';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../../config/auth-config';
import { CREATE_ACCOUNT_ROUTE, FORGOT_PASSWORD_ROUTE } from '../../config/route-names';

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

    emailFormControl: FormControl;
    passwordFormControl: FormControl;

    isLoading: boolean;
    rememberMe: boolean;
    matcher = new AuthErrorStateMatcher();
    isEmpty = (el: ElementRef): boolean => isEmptyView(el);
    isPasswordVisible = false;
    enableDebugMode = true;
    debugMode = false;
    enableCreateAccount = false;

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _router: Router,
        private readonly _stateService: PxbAuthStateService,
        private readonly _apiService: PxbAuthApiService,
        @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig
    ) {}

    // TODO: WRITE REMEMBER ME TO STATE

  pik(): void {
      console.log(this.emailFormControl);
  }

    ngOnInit(): void {
      const emailValidators = [Validators.required, Validators.email ];
      if (this.customEmailValidator) {
        emailValidators.push(this.customEmailValidator);
      }
      this.emailFormControl = new FormControl('', emailValidators);
      this.passwordFormControl = new FormControl('', []);
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
        this.isLoading = true;
        this._apiService
            .login()
            .then((success: boolean) => {
                this._stateService.setAuthenticated(success);
                void this._router.navigate([this._config.homeRoute]);
                this.isLoading = false;
            })
            .catch(() => {
                this._stateService.setAuthenticated(false);
                this.isLoading = false;
            });
    }

    forgotPassword(): void {
        void this._router.navigate([`${this._config.authRoute}/${FORGOT_PASSWORD_ROUTE}`]);
    }

    testForgotPasswordEmail(): void {
        // void this._router.navigate([`${this._config.authRoute}/${FORGOT_PASSWORD_EMAIL_ROUTE}`]);
    }
    
    testInviteRegister(): void {
        // void this._router.navigate([`${this._config.authRoute}/${CREATE_ACCOUNT_INVITE_ROUTE}`]);
    }

    createAccount(): void {
        void this._router.navigate([`${this._config.authRoute}/${CREATE_ACCOUNT_ROUTE}`]);
    }

    contactEatonSupport(): void {
        // void this._router.navigate([`${this._config.authRoute}/${CONTACT_EATON_SUPPORT_ROUTE}`]);
    }

    isValidFormEntries(): boolean {
        return this.passwordFormControl.value && !this.emailFormControl.errors;
    }
}
