import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbRegisterUIService } from '../../services/api/register-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbCreateAccountErrorDialogService } from '../../services/dialog/create-account-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'pxb-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
})
export class PxbCreateAccountComponent {
    @Input() userName: string;
    @Input() accountDetails: FormControl[] = [];
    @Input() hasValidAccountDetails = false;
    @Input() useDefaultAccountDetails;

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

    ngOnInit(): void {
        // Unless the user has specified otherwise, use the defaultAccountDetails if there are no custom forms provided.
        if (this.useDefaultAccountDetails === undefined) {
            this.useDefaultAccountDetails = this.accountDetails.length === 0;
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
            .catch((data: ErrorDialogData) => {
                this._pxbErrorDialogService.openDialog(data);
                this._pxbSecurityService.setLoading(false);
            });
    }

    clearAccountDetailsInfo(): void {
        for (const formControl of this.accountDetails) {
            formControl.reset();
        }
    }

    registerAccount(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .completeRegistration(this.accountDetails, this.password, this.verificationCode, this.email)
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
                return this.hasValidAccountDetails;
            default:
                return;
        }
    }

    goBack(): void {
        this.currentPageId === 0 ? this.navigateToLogin() : this.currentPageId--;
    }

    goNext(): any {
        switch (this.currentPageId) {
            case 2:
                return this.validateVerificationCode();
            case 3:
                return this.skipAccountDetails() ? this.registerAccount() : this.currentPageId++;
            case 4:
                return this.registerAccount();
            default:
                return this.currentPageId++;
        }
    }

    skipAccountDetails(): boolean {
        return !this.useDefaultAccountDetails && this.accountDetails.length === 0;
    }

    getNumberOfSteps(): number {
        return this.skipAccountDetails() ? 5 : 6;
    }

    navigateToLogin(): void {
        this.clearAccountDetailsInfo();
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    showStepper(): boolean {
        return this.currentPageId <= (this.skipAccountDetails() ? 3 : 4);
    }

    getUserName(): string {
        if (this.useDefaultAccountDetails) {
            return `${this.accountDetails[0].value} ${this.accountDetails[1].value}`;
        }
        return this.userName;
    }
}
