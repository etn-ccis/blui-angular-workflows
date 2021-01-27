import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbRegisterUIService } from '../../services/api/register-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbCreateAccountInviteErrorDialogService } from '../../services/dialog/create-account-invite-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pxb-create-account-invite',
    templateUrl: './create-account-invite.component.html',
    styleUrls: ['./create-account-invite.component.scss'],
})
export class PxbCreateAccountInviteComponent implements OnInit, OnDestroy {
    @Input() accountDetailsPage1: FormControl[] = [];
    @Input() accountDetailsPage2: FormControl[] = [];
    @Input() hasValidAccountDetailsPage1 = false;
    @Input() hasValidAccountDetailsPage2 = false;

    currentPageId = 0;
    isLoading: boolean;
    isValidRegistrationLink: boolean;

    // EULA Page
    userAcceptsEula: boolean;

    // Create Password Page
    password: string;
    passwordMeetsRequirements: boolean;

    // Account Details Page
    validAccountName: boolean;
    firstName: string;
    lastName: string;

    stateListener: Subscription;

    constructor(
        private readonly _router: Router,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbRegisterService: PxbRegisterUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbErrorDialogService: PxbCreateAccountInviteErrorDialogService
    ) {
        this.stateListener = this._pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
        });
    }

    ngOnInit(): void {
        this.validateRegistrationLink();
    }

    ngOnDestroy(): void {
        this.stateListener.unsubscribe();
    }

    validateRegistrationLink(): void {
        this._pxbSecurityService.setLoadingMessage('Validating registration link...');
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .validateUserRegistrationRequest()
            .then(() => {
                this._pxbSecurityService.setLoading(false);
                this.isValidRegistrationLink = true;
            })
            .catch((data: ErrorDialogData) => {
                this._pxbErrorDialogService.openDialog(data);
                this._pxbSecurityService.setLoading(false);
                this.isValidRegistrationLink = false;
            });
    }

    registerAccount(): void {
        this._pxbSecurityService.setLoading(true);
        const accountDetails = this.accountDetailsPage1.concat(this.accountDetailsPage2);
        this._pxbRegisterService
            .completeRegistration(this.firstName, this.lastName, accountDetails, this.password)
            .then(() => {
                this._pxbSecurityService.setLoading(false);
                this.currentPageId++;
            })
            .catch((data: ErrorDialogData) => {
                this._pxbSecurityService.setLoading(false);
                this._pxbErrorDialogService.openDialog(data);
            });
    }

    clearAccountDetailsInfo(): void {
        for (const formControl of this.accountDetailsPage1) {
            formControl.reset();
        }
        for (const formControl of this.accountDetailsPage2) {
            formControl.reset();
        }
    }

    canContinue(): boolean {
        switch (this.currentPageId) {
            case 0:
                return this.userAcceptsEula;
            case 1:
                return this.passwordMeetsRequirements;
            case 2:
                return (
                    this.validAccountName && (this.hasValidAccountDetailsPage1 || this.accountDetailsPage1.length === 0)
                );
            case 3:
                return this.hasValidAccountDetailsPage2;
            default:
                return;
        }
    }

    hasEmptyStateError(): boolean {
        return !this.isValidRegistrationLink;
    }

    goBack(): void {
        this.currentPageId === 0 ? this.navigateToLogin() : this.currentPageId--;
    }

    goNext(): any {
        switch (this.currentPageId) {
            case 1:
                return this.currentPageId++;
            case 2:
                return this.hasExtendedAccountDetails() ? this.currentPageId++ : this.registerAccount();
            case 3:
                return this.registerAccount();
            default:
                return this.currentPageId++;
        }
    }

    navigateToLogin(): void {
        this.clearAccountDetailsInfo();
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    showStepper(): boolean {
        return this.currentPageId <= (this.hasExtendedAccountDetails() ? 3 : 2);
    }

    getNumberOfSteps(): number {
        return this.hasExtendedAccountDetails() ? 4 : 3;
    }

    getUserName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    hasExtendedAccountDetails(): boolean {
        return this.accountDetailsPage2 && this.accountDetailsPage2.length > 0;
    }
}
