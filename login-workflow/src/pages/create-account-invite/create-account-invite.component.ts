import { Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_ROUTES } from '../../auth/auth.routes';
import { BluiRegisterUIService } from '../../services/api';
import { BluiAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { BluiCreateAccountInviteErrorDialogService } from '../../services/dialog/create-account-invite-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { Subscription } from 'rxjs';
import { BluiAuthConfig } from '../../services/config/auth-config';
import { BluiAuthTranslations } from '../../translations/auth-translations';

import { CreateAccountService } from '../create-account/create-account.service';
import { AccountDetails } from '../create-account/create-account.component';
import { isEmptyView } from '../../util/view-utils';
import { RegistrationSuccessScreenContext } from '../create-account/steps/account-created/account-created.component';

const ACCOUNT_DETAILS_STARTING_PAGE = 2;

@Component({
    selector: 'blui-create-account-invite',
    templateUrl: './create-account-invite.component.html',
    styleUrls: ['./create-account-invite.component.scss'],
})
export class BluiCreateAccountInviteComponent implements OnInit, OnDestroy {
    @Input() accountDetails: AccountDetails[] = [];
    @Input() registrationSuccessScreen: TemplateRef<any>;
    @Input() existingAccountSuccessScreen: TemplateRef<any>;

    @ViewChild('registrationLinkErrorTitleVC') registrationLinkErrorTitleEl;
    @ViewChild('registrationLinkErrorDescVC') registrationLinkErrorDescEl;

    isLoading: boolean;
    isValidRegistrationLink: boolean;
    isBrightlayerCloudAccount: boolean;

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
    isEmpty = (el: ElementRef): boolean => isEmptyView(el);
    translate: BluiAuthTranslations;

    registrationSuccessScreenContext: RegistrationSuccessScreenContext;

    constructor(
        private readonly _router: Router,
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiRegisterService: BluiRegisterUIService,
        private readonly _bluiSecurityService: BluiAuthSecurityService,
        private readonly _bluiErrorDialogService: BluiCreateAccountInviteErrorDialogService
    ) {
        this.stateListener = this._bluiSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
        });
    }

    ngOnInit(): void {
        this.translate = this._bluiAuthConfig.getTranslations();
        this.validateRegistrationLink();
        this.registrationUtils = new CreateAccountService(ACCOUNT_DETAILS_STARTING_PAGE, this.accountDetails);
    }

    ngOnDestroy(): void {
        this.stateListener.unsubscribe();
    }

    validateRegistrationLink(): void {
        this._bluiSecurityService.setLoadingMessage('Validating registration link...');
        this._bluiSecurityService.setLoading(true);
        this._bluiRegisterService
            .validateUserRegistrationRequest()
            .then((registrationComplete) => {
                this._bluiSecurityService.setLoading(false);
                this.isValidRegistrationLink = true;
                this.isBrightlayerCloudAccount = registrationComplete;
            })
            .catch((data: ErrorDialogData) => {
                this._bluiErrorDialogService.openDialog(data);
                this._bluiSecurityService.setLoading(false);
                this.isValidRegistrationLink = false;
            });
    }

    registerAccount(): void {
        this._bluiSecurityService.setLoading(true);
        const customForms = this.registrationUtils.getAccountDetailsCustomValues();
        this._bluiRegisterService
            .completeRegistration(this.firstName, this.lastName, customForms, this.password)
            .then(() => {
                this._bluiSecurityService.setLoading(false);
                this.registrationSuccessScreenContext = {
                    email: undefined,
                    firstName: this.firstName,
                    lastName: this.lastName,
                };
                for (const key of customForms.keys()) {
                    this.registrationSuccessScreenContext[key] = customForms.get(key).value;
                }
                this._bluiSecurityService.updateSecurityState({ registrationPassword: '' });
                this.registrationUtils.clearAccountDetails();
                this.registrationUtils.nextStep();
            })
            .catch((data: ErrorDialogData) => {
                this._bluiSecurityService.setLoading(false);
                this._bluiErrorDialogService.openDialog(data);
            });
    }

    attemptContinue(): void {
        if (this.canContinue()) {
            this.goNext();
        }
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

    goNext(): any {
        if (this.registrationUtils.isAccountDetailsPage()) {
            return this.registrationUtils.isLastAccountDetailsPage()
                ? this.registerAccount()
                : this.registrationUtils.nextStep();
        }
        if (this.registrationUtils.getCurrentPage() === 1) {
            this._bluiSecurityService.updateSecurityState({ registrationPassword: this.password });
        }
        return this.registrationUtils.nextStep();
    }

    goBack(): void {
        if (this.registrationUtils.getCurrentPage() === 0) {
            this.navigateToLogin();
        } else {
            this.registrationUtils.prevStep();
        }
    }

    navigateToLogin(): void {
        this._bluiSecurityService.updateSecurityState({ registrationPassword: '' });
        this.registrationUtils.clearAccountDetails();
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    getUserName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
