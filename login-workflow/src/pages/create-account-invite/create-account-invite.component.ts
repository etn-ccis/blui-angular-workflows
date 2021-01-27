import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbRegisterUIService } from '../../services/api/register-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbCreateAccountInviteErrorDialogService } from '../../services/dialog/create-account-invite-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { Subscription } from 'rxjs';
import {AccountDetails} from "../..";

const ACCOUNT_DETAILS_STARTING_PAGE = 2;

@Component({
    selector: 'pxb-create-account-invite',
    templateUrl: './create-account-invite.component.html',
    styleUrls: ['./create-account-invite.component.scss'],
})
export class PxbCreateAccountInviteComponent implements OnInit, OnDestroy {
    @Input() accountDetails: AccountDetails[] = [];

    currentPageId = 0;
    accountDetailsPageStart = ACCOUNT_DETAILS_STARTING_PAGE;
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

    clearAccountDetailsInfo(): void {
        for (const detail of this.accountDetails) {
            for (const formControl of detail.forms) {
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
        const formControls = [];
        for (const detail of this.accountDetails) {
            formControls.concat(detail.forms);
        }
        this._pxbRegisterService
            .completeRegistration(this.firstName, this.lastName, formControls, this.password)
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
        if (this.isAccountDetailsPage()) {
            const detailsIndex = this.currentPageId - ACCOUNT_DETAILS_STARTING_PAGE;
            return this.currentPageId === ACCOUNT_DETAILS_STARTING_PAGE
                ? this.validAccountName && (!this.isAccountDetailsPopulated(0) || this.accountDetails[0].isValid())
                : this.isAccountDetailsPopulated(detailsIndex) && this.accountDetails[detailsIndex].isValid();
        }
        switch (this.currentPageId) {
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
        if (this.isAccountDetailsPage()) {
            return this.isLastAccountDetailsPage() ? this.registerAccount() : this.currentPageId++;
        }
        return this.currentPageId++;
    }

    goBack(): void {
        this.currentPageId === 0 ? this.navigateToLogin() : this.currentPageId--;
    }

    navigateToLogin(): void {
        this.clearAccountDetailsInfo();
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    showStepper(): boolean {
        return this.currentPageId < ACCOUNT_DETAILS_STARTING_PAGE + this.getNumberOfAccountsDetailsPages();
    }

    getNumberOfSteps(): number {
        return ACCOUNT_DETAILS_STARTING_PAGE + this.getNumberOfAccountsDetailsPages();
    }

    getUserName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    isAccountDetailsPage(): boolean {
        return (
            this.currentPageId >= ACCOUNT_DETAILS_STARTING_PAGE &&
            this.currentPageId < ACCOUNT_DETAILS_STARTING_PAGE + this.getNumberOfAccountsDetailsPages());
    }

    isLastAccountDetailsPage(): boolean {
        return this.currentPageId === (ACCOUNT_DETAILS_STARTING_PAGE + this.getNumberOfAccountsDetailsPages());
    }

    isAccountDetailsPopulated(index: number): boolean {
        return this.accountDetails && this.accountDetails[index] && this.accountDetails[index].forms.length > 0;
    }

    showAccountDetailPage(page: number): boolean {
        return page < this.getNumberOfAccountsDetailsPages() &&
            this.currentPageId === ACCOUNT_DETAILS_STARTING_PAGE + page;
    }

    showAccountCreated(): boolean {
        return this.currentPageId === ACCOUNT_DETAILS_STARTING_PAGE + this.getNumberOfAccountsDetailsPages();
    }

    getNumberOfAccountsDetailsPages(): number {
        return this.accountDetails.length === 0 ? 1 : this.accountDetails.length;
    }
}
