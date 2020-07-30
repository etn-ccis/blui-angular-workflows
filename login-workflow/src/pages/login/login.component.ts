import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { PxbAuthApiService } from '../../services/api/api.service';
import { PxbAuthStateService } from '../../services/state/state.service';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../../auth.module';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { CREATE_ACCOUNT_ROUTE, FORGOT_PASSWORD_ROUTE } from '../../auth/auth.routing';

@Component({
    selector: 'pxb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class PxbLoginComponent {
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    passwordFormControl = new FormControl('', []);

    matcher = new AuthErrorStateMatcher();
    isLoading: boolean;
    rememberMe: boolean;

    constructor(
        private readonly _router: Router,
        private readonly _stateService: PxbAuthStateService,
        private readonly _apiService: PxbAuthApiService,
        @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig
    ) {}

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
