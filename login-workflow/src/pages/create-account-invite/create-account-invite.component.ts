import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbRegisterUIService } from '../../services/api/register-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbCreateAccountInviteErrorDialogService } from '../../services/dialog/create-account-invite-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { Subscription } from 'rxjs';
import { AccountDetails } from '../..';
import { CreateAccountService } from '../create-account/create-account.service';

const ACCOUNT_DETAILS_STARTING_PAGE = 2;

@Component({
    selector: 'pxb-create-account-invite',
    templateUrl: './create-account-invite.component.html',
    styleUrls: ['./create-account-invite.component.scss'],
})
export class PxbCreateAccountInviteComponent implements OnInit, OnDestroy {
    @Input() accountDetails: AccountDetails[] = [];

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
    registrationUtils: CreateAccountService;

    constructor(
        private readonly _router: Router,
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
        this.registrationUtils = new CreateAccountService(ACCOUNT_DETAILS_STARTING_PAGE, this.accountDetails);
    }

    ngOnDestroy(): void {
        this.stateListener.unsubscribe();
    }

    clearAccountDetailsInfo(): void {
        for (const detail of this.accountDetails) {
            for (const formControl of detail.formControls) {
                formControl.reset();
            }
        }
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
        this._pxbRegisterService
            .completeRegistration(
                this.firstName,
                this.lastName,
                this.registrationUtils.getAccountDetailsCustomValues(),
                this.password
            )
            .then(() => {
                this._pxbSecurityService.setLoading(false);
                this.registrationUtils.nextStep();
            })
            .catch((data: ErrorDialogData) => {
                this._pxbSecurityService.setLoading(false);
                this._pxbErrorDialogService.openDialog(data);
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
                return this.userAcceptsEula;
            case 1:
                return this.passwordMeetsRequirements;
            default:
                return;
        }
    }

    hasEmptyStateError(): boolean {
        return !this.isValidRegistrationLink;
    }

    goNext(): any {
        if (this.registrationUtils.isAccountDetailsPage()) {
            return this.registrationUtils.isLastAccountDetailsPage()
                ? this.registerAccount()
                : this.registrationUtils.nextStep();
        }
        return this.registrationUtils.nextStep();
    }

    goBack(): void {
        this.registrationUtils.getCurrentPage() === 0 ? this.navigateToLogin() : this.registrationUtils.prevStep();
    }

    navigateToLogin(): void {
        this.clearAccountDetailsInfo();
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    getUserName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
