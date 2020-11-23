import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN_ROUTE } from '../../auth/auth.routes';

import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbRegisterUIService } from '../../services/api/register-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbCreateAccountInviteErrorDialogService } from './dialog/create-account-invite-error-dialog.service';

@Component({
    selector: 'pxb-create-account-invite',
    templateUrl: './create-account-invite.component.html',
    styleUrls: ['./create-account-invite.component.scss'],
})
export class PxbCreateAccountInviteComponent implements OnInit {
    pageCount = 4;
    currentPageId = 0;

    isLoading = true;
    hasEulaLoadError = false;
    isValidRegistrationLink = false;

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
        private readonly _formBuilder: FormBuilder,
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
            .catch(() => {
                this.isValidRegistrationLink = false;
                this._pxbSecurityService.setLoading(false);
            });
    }

    getEULA(): void {
        if (this._pxbAuthConfig.eula) {
            this.licenseAgreement = this._pxbAuthConfig.eula;
        } else {
            this._pxbRegisterService
                .loadEULA()
                .then((eula: string) => {
                    this.licenseAgreement = eula;
                    this._pxbSecurityService.setLoading(false);
                })
                .catch(() => {
                    this.hasEulaLoadError = true;
                    this._pxbSecurityService.setLoading(false);
                });
        }
    }

    registerAccount(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .completeRegistration(this.firstName, this.lastName, this.phoneNumber, this.password)
            .then(() => {
                this._pxbSecurityService.setLoading(false);
                this.currentPageId += 1;
            })
            .catch(() => {
                this._pxbSecurityService.setLoading(false);
                this._pxbErrorDialogService.openDialog();
            });
    }

    getTitle(): string {
        switch (this.currentPageId) {
            case 0:
                return 'License Agreement';
            case 1:
                return 'Create Password';
            case 2:
                return 'Account Details';
            case 3:
                return 'Account Created!';
            default:
                return;
        }
    }

    getSuccessEmptyStateTitle(): string {
        return `Welcome, ${this.firstName} ${this.lastName}!`;
    }

    getSuccessEmptyStateDescription(): string {
        return `Your account has been successfully created with the email ${
            this._pxbSecurityService.getSecurityState().email
        }. Your account has already been added to the organization. Press Continue below to finish.`;
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

    goBack(): void {
        if (this.currentPageId === 0) {
            this.navigateToLogin();
        } else {
            this.currentPageId = this.currentPageId - 1;
        }
    }

    next(): void {
        this.currentPageId = this.currentPageId + 1;
    }

    navigateToLogin(): void {
        void this._router.navigate([`${this._pxbAuthConfig.authRoute}/${LOGIN_ROUTE}`]);
    }
}
