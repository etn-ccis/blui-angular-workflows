import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbRegisterUIService } from '../../services/api/register-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbCreateAccountErrorDialogService } from '../../services/dialog/create-account-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pxb-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
})
export class PxbCreateAccountComponent implements OnDestroy {
    @Input() accountDetailsPage1: FormControl[] = [];
    @Input() accountDetailsPage2: FormControl[] = [];
    @Input() hasValidAccountDetailsPage1 = false;
    @Input() hasValidAccountDetailsPage2 = false;

    currentPageId = 0;
    isLoading = true;
    isValidVerificationCode = true;

    // Provide Email Page
    email: string;
    isValidEmail: boolean;

    // Verify Email Page
    verificationCode: string;

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
        private readonly _pxbErrorDialogService: PxbCreateAccountErrorDialogService
    ) {
        this.stateListener = this._pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
        });
    }

    ngOnDestroy(): void {
        this.stateListener.unsubscribe();
    }

    validateVerificationCode(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .validateUserRegistrationRequest(this.verificationCode)
            .then(() => {
                this._pxbSecurityService.setLoading(false);
                this.currentPageId++;
            })
            .catch((data: ErrorDialogData) => {
                this._pxbErrorDialogService.openDialog(data);
                this._pxbSecurityService.setLoading(false);
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

    registerAccount(): void {
        this._pxbSecurityService.setLoading(true);
        const accountDetails = this.accountDetailsPage1.concat(this.accountDetailsPage2);
        this._pxbRegisterService
            .completeRegistration(
                this.firstName,
                this.lastName,
                accountDetails,
                this.password,
                this.verificationCode,
                this.email
            )
            .then(() => {
                this._pxbSecurityService.setLoading(false);
                this._pxbSecurityService.updateSecurityState({ email: this.email });
                this.currentPageId++;
            })
            .catch((data: ErrorDialogData) => {
                this._pxbErrorDialogService.openDialog(data);
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
                return (
                    this.validAccountName && (this.hasValidAccountDetailsPage1 || this.accountDetailsPage1.length === 0)
                );
            case 5:
                return this.hasValidAccountDetailsPage2;
            default:
                return;
        }
    }

    goNext(): any {
        switch (this.currentPageId) {
            case 2:
                return this.validateVerificationCode();
            case 3:
                return this.currentPageId++;
            case 4:
                return this.hasExtendedAccountDetails() ? this.currentPageId++ : this.registerAccount();
            case 5:
                return this.registerAccount();
            default:
                return this.currentPageId++;
        }
    }

    goBack(): void {
        this.currentPageId === 0 ? this.navigateToLogin() : this.currentPageId--;
    }

    navigateToLogin(): void {
        this.clearAccountDetailsInfo();
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    showStepper(): boolean {
        return this.currentPageId <= (this.hasExtendedAccountDetails() ? 5 : 4);
    }

    getNumberOfSteps(): number {
        return this.hasExtendedAccountDetails() ? 6 : 5;
    }

    getUserName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    hasExtendedAccountDetails(): boolean {
        return this.accountDetailsPage2 && this.accountDetailsPage2.length > 0;
    }
}
