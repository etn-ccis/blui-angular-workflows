import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LOGIN_ROUTE } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbRegisterUIService } from '../../services/api/register-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbCreateAccountErrorDialogService } from './dialog/create-account-error-dialog.service';

@Component({
    selector: 'pxb-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
})
export class PxbCreateAccountComponent {
    currentPageId = 0;
    isLoading = true;
    hasEulaLoadError = false;
    isValidVerificationCode = true;

    // Provide Email Page
    email: string;
    isValidEmail: boolean;

    // Verify Email Page
    verificationCode: string;

    // EULA Page
    licenseAgreement: string;
    userAcceptsEula: boolean;

    // Create Password Page
    password: string;
    passwordMeetsRequirements: boolean;

    // Account Details Page
    firstName: string;
    lastName: string;
    phoneNumber: string;
    validAccountDetails: boolean;

    constructor(
        private readonly _router: Router,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbRegisterService: PxbRegisterUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbErrorDialogService: PxbCreateAccountErrorDialogService
    ) {
        this._pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
        });
    }

    getEULA(): void {
        if (this._pxbAuthConfig.eula) {
            this.licenseAgreement = this._pxbAuthConfig.eula;
        } else {
            this._pxbSecurityService.setLoading(true);
            this._pxbRegisterService
                .loadEULA()
                .then((eula: string) => {
                    this.licenseAgreement = eula;
                    this._pxbSecurityService.setLoading(false);
                    this.currentPageId++;
                })
                .catch(() => {
                    this._pxbErrorDialogService.openDialog();
                    this._pxbSecurityService.setLoading(false);
                });
        }
    }

    validateVerificationCode(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .validateUserRegistrationRequest(this.verificationCode)
            .then(() => {
                this._pxbSecurityService.setLoading(false);
                this.currentPageId++;
            })
            .catch(() => {
                this._pxbErrorDialogService.openDialog();
                this._pxbSecurityService.setLoading(false);
            });
    }

    registerAccount(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .completeRegistration(this.firstName, this.lastName, this.phoneNumber, this.password, this.verificationCode, this.email)
            .then(() => {
                this._pxbSecurityService.setLoading(false);
                this._pxbSecurityService.updateSecurityState({ email: this.email });
                this.currentPageId++;
            })
            .catch(() => {
                this._pxbErrorDialogService.openDialog();
                this._pxbSecurityService.setLoading(false);
            });
    }

    canContinue(): boolean {
        switch (this.currentPageId) {
            case 0:
                return this.isValidEmail;
            case 1:
                return this.userAcceptsEula;
            case 2:
                return Boolean(this.verificationCode);
            case 3:
                return this.passwordMeetsRequirements;
            case 4:
                return this.validAccountDetails;
            default:
                return;
        }
    }

    goBack(): void {
        this.currentPageId === 0 ? this.navigateToLogin() : this.currentPageId--;
    }

    goNext(): any {
        switch (this.currentPageId) {
            case 0:
                return this.getEULA();
            case 2:
                return this.validateVerificationCode();
            case 4:
                return this.registerAccount();
            default:
                return this.currentPageId++;
        }
    }

    navigateToLogin(): void {
        void this._router.navigate([`${this._pxbAuthConfig.authRoute}/${LOGIN_ROUTE}`]);
    }
}
