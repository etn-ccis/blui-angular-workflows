import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbRegisterUIService } from '../../services/api/register-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbCreateAccountInviteErrorDialogService } from '../../services/dialog/create-account-invite-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'pxb-create-account-invite',
    templateUrl: './create-account-invite.component.html',
    styleUrls: ['./create-account-invite.component.scss'],
})
export class PxbCreateAccountInviteComponent implements OnInit {
    @Input() accountDetails: FormControl[] = [];
    @Input() hasValidAccountDetails = false;
    @Input() userName: string;

    currentPageId = 0;
    isLoading: boolean;
    isValidRegistrationLink: boolean;

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
            .completeRegistration(this.accountDetails, this.password)
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
                return this.hasValidAccountDetails;
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

    goNext(): void {
        this.currentPageId === 2 ? this.registerAccount() : this.currentPageId++;
    }

    navigateToLogin(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }
}
