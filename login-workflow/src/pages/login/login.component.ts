import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { PxbAuthApiService } from '../../services/api/api.service';
import { PxbAuthStateService } from '../../services/state/state.service';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { isEmptyView } from '../../util/view-utils';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../../config/auth-config';
import { CREATE_ACCOUNT_ROUTE, FORGOT_PASSWORD_ROUTE } from '../../config/route-names';

@Component({
    selector: 'pxb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class PxbLoginComponent implements AfterViewInit {
    @ViewChild('header', { static: false }) headerEl: ElementRef;
    @ViewChild('footer', { static: false }) footerEl: ElementRef;

    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    passwordFormControl = new FormControl('', []);

    isLoading: boolean;
    rememberMe: boolean;
    matcher = new AuthErrorStateMatcher();
    isEmpty = (el: ElementRef): boolean => isEmptyView(el);

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _router: Router,
        private readonly _stateService: PxbAuthStateService,
        private readonly _apiService: PxbAuthApiService,
        @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig
    ) {}

    // TODO: WRITE REMEMBER ME TO STATE

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
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

    createAccount(): void {
        void this._router.navigate([`${this._config.authRoute}/${CREATE_ACCOUNT_ROUTE}`]);
    }

    isValidFormEntries(): boolean {
        return this.passwordFormControl.value && !this.emailFormControl.errors;
    }
}
