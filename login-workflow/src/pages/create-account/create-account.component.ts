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
import { CreateAccountService } from './create-account.service';

const ACCOUNT_DETAILS_STARTING_PAGE = 4;

export type AccountDetails = {
    formControls: FormControl[];
    isValid: () => boolean;
};

@Component({
    selector: 'pxb-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
})
export class PxbCreateAccountComponent implements OnDestroy {
    @Input() accountDetails: AccountDetails[] = [];

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
    registrationUtils: CreateAccountService;

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

    ngOnInit(): void {
        this.registrationUtils = new CreateAccountService(ACCOUNT_DETAILS_STARTING_PAGE, this.accountDetails);
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
                this.registrationUtils.nextStep();
            })
            .catch((data: ErrorDialogData) => {
                this._pxbErrorDialogService.openDialog(data);
                this._pxbSecurityService.setLoading(false);
            });
    }

    registerAccount(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .completeRegistration(
                this.firstName,
                this.lastName,
                this.registrationUtils.getAccountDetailsCustomValues(),
                this.password,
                this.verificationCode,
                this.email
            )
            .then(() => {
                this._pxbSecurityService.setLoading(false);
                this._pxbSecurityService.updateSecurityState({ email: this.email });
                this.registrationUtils.nextStep();
            })
            .catch((data: ErrorDialogData) => {
                this._pxbErrorDialogService.openDialog(data);
                this._pxbSecurityService.setLoading(false);
            });
    }

    canContinue(): boolean {
        if (this.registrationUtils.isAccountDetailsPage()) {
            return this.registrationUtils.isFirstAccountDetailsPage()
                ? this.validAccountName && this.registrationUtils.hasValidAccountDetails()
                : this.registrationUtils.hasValidAccountDetails();
        }
        switch (this.registrationUtils.getCurrentPage()) {
            case 0:
                return this.isValidEmail;
            case 1:
                return this.userAcceptsEula;
            case 2:
                return Boolean(this.verificationCode);
            case 3:
                return this.passwordMeetsRequirements;
            default:
                break;
        }
    }

    goNext(): any {
        if (this.registrationUtils.isAccountDetailsPage()) {
            return this.registrationUtils.isLastAccountDetailsPage()
                ? this.registerAccount()
                : this.registrationUtils.nextStep();
        }
        if (this.registrationUtils.getCurrentPage() === 2) {
            return this.validateVerificationCode();
        }
        return this.registrationUtils.nextStep();
    }

    goBack(): void {
        this.registrationUtils.getCurrentPage() === 0 ? this.navigateToLogin() : this.registrationUtils.prevStep();
    }

    navigateToLogin(): void {
        this.registrationUtils.clearAccountDetails();
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    getUserName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
