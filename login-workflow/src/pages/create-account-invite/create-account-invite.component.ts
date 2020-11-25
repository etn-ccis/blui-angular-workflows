import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LOGIN_ROUTE } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbRegisterUIService } from '../../services/api/register-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbCreateAccountInviteErrorDialogService } from '../../services/dialog/create-account-invite-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';

@Component({
    selector: 'pxb-create-account-invite',
    templateUrl: './create-account-invite.component.html',
    styleUrls: ['./create-account-invite.component.scss'],
})
export class PxbCreateAccountInviteComponent implements OnInit {
    currentPageId = 0;
    isLoading = true;
    hasEulaLoadError = false;
    isValidRegistrationLink = true;

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
        private readonly _pxbErrorDialogService: PxbCreateAccountInviteErrorDialogService
    ) {
        this._pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
        });
    }

    ngOnInit(): void {
        this.validateRegistrationLink();
    }

    validateRegistrationLink(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .validateUserRegistrationRequest()
            .then(() => {
                this.isValidRegistrationLink = true;
                this.getEULA();
            })
            .catch((data: ErrorDialogData) => {
                this.isValidRegistrationLink = false;
                this._pxbErrorDialogService.openDialog(data);
                this._pxbSecurityService.setLoading(false);
            });
    }

    getEULA(): void {
        if (this._pxbAuthConfig.eula) {
            this.licenseAgreement = this._pxbAuthConfig.eula;
            this._pxbSecurityService.setLoading(false);
        } else {
            this._pxbRegisterService
                .loadEULA()
                .then((eula: string) => {
                    this.licenseAgreement = eula;
                    this._pxbSecurityService.setLoading(false);
                })
                .catch((data: ErrorDialogData) => {
                    this.hasEulaLoadError = true;
                    this._pxbSecurityService.setLoading(false);
                    this._pxbErrorDialogService.openDialog(data);
                });
        }
    }

    registerAccount(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .completeRegistration(this.firstName, this.lastName, this.phoneNumber, this.password)
            .then(() => {
                this._pxbSecurityService.setLoading(false);
                this.currentPageId++;
            })
            .catch((data: ErrorDialogData) => {
                this._pxbSecurityService.setLoading(false);
                this._pxbErrorDialogService.openDialog(data);
            });
    }

    canContinue(): boolean {
        switch (this.currentPageId) {
            case 0:
                return this.userAcceptsEula;
            case 1:
                return this.passwordMeetsRequirements;
            case 2:
                return this.validAccountDetails;
            default:
                return;
        }
    }

    hasEmptyStateError(): boolean {
        return this.hasEulaLoadError || !this.isValidRegistrationLink;
    }

    goBack(): void {
        this.currentPageId === 0 ? this.navigateToLogin() : this.currentPageId--;
    }

    goNext(): void {
        this.currentPageId === 2 ? this.registerAccount() : this.currentPageId++;
    }

    navigateToLogin(): void {
        void this._router.navigate([`${this._pxbAuthConfig.authRoute}/${LOGIN_ROUTE}`]);
    }
}
