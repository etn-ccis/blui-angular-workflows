import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatLegacyFormField as MatFormField } from '@angular/material/legacy-form-field';
import { FormControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AUTH_ROUTES } from '../../auth/auth.routes';
import { BluiAuthConfig } from '../../services/config/auth-config';
import { BluiRegisterUIService } from '../../services/api';
import { BluiAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { BluiCreateAccountErrorDialogService } from '../../services/dialog/create-account-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { CreateAccountService } from './create-account.service';
import { BluiAuthTranslations } from '../../translations/auth-translations';
import { RegistrationSuccessScreenContext } from './steps/account-created/account-created.component';

const ACCOUNT_DETAILS_STARTING_PAGE = 4;

export type AccountDetails = {
    pageTitle?: string;
    pageInstructions?: string;
    form: TemplateRef<MatFormField>;
    formControls: Map<string, FormControl>;
    isValid: () => boolean;
};

@Component({
    selector: 'blui-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
})
export class BluiCreateAccountComponent implements OnDestroy {
    @Input() customEmailValidator: ValidatorFn;
    @Input() accountDetails: AccountDetails[] = [];
    @Input() registrationSuccessScreen: TemplateRef<any>;
    @Input() existingAccountSuccessScreen: TemplateRef<any>;

    isLoading = true;
    isValidVerificationCode = true;
    isBrightlayerCloudAccount: boolean;

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
    translate: BluiAuthTranslations;

    registrationSuccessScreenContext: RegistrationSuccessScreenContext;

    constructor(
        private readonly _router: Router,
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiRegisterService: BluiRegisterUIService,
        private readonly _bluiSecurityService: BluiAuthSecurityService,
        private readonly _bluiErrorDialogService: BluiCreateAccountErrorDialogService
    ) {
        this.stateListener = this._bluiSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
        });
    }

    ngOnInit(): void {
        this.translate = this._bluiAuthConfig.getTranslations();
        this.registrationUtils = new CreateAccountService(ACCOUNT_DETAILS_STARTING_PAGE, this.accountDetails);
    }

    ngOnDestroy(): void {
        this.stateListener.unsubscribe();
    }

    sendVerificationEmail(): void {
        this._bluiSecurityService.setLoading(true);
        this._bluiRegisterService
            .requestRegistrationCode(this.email)
            .then(() => {
                this._bluiSecurityService.setLoading(false);
                this.registrationUtils.nextStep();
            })
            .catch((data: ErrorDialogData) => {
                this._bluiErrorDialogService.openDialog(data);
                this._bluiSecurityService.setLoading(false);
            });
    }

    validateVerificationCode(): void {
        this._bluiSecurityService.setLoading(true);
        this._bluiRegisterService
            .validateUserRegistrationRequest(this.verificationCode)
            .then((registrationComplete) => {
                this._bluiSecurityService.setLoading(false);
                this.registrationUtils.nextStep();
                this.isBrightlayerCloudAccount = registrationComplete;
            })
            .catch((data: ErrorDialogData) => {
                this._bluiErrorDialogService.openDialog(data);
                this._bluiSecurityService.setLoading(false);
            });
    }

    registerAccount(): void {
        this._bluiSecurityService.setLoading(true);
        const customForms = this.registrationUtils.getAccountDetailsCustomValues();
        this._bluiRegisterService
            .completeRegistration(
                this.firstName,
                this.lastName,
                customForms,
                this.password,
                this.verificationCode,
                this.email
            )
            .then(() => {
                this._bluiSecurityService.setLoading(false);
                this._bluiSecurityService.updateSecurityState({ registrationEmail: this.email });
                this.registrationSuccessScreenContext = {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                };
                for (const key of customForms.keys()) {
                    this.registrationSuccessScreenContext[key] = customForms.get(key).value;
                }
                this._bluiSecurityService.updateSecurityState({ registrationEmail: '', registrationPassword: '' });
                this.registrationUtils.clearAccountDetails();
                this.registrationUtils.nextStep();
            })
            .catch((data: ErrorDialogData) => {
                this._bluiErrorDialogService.openDialog(data);
                this._bluiSecurityService.setLoading(false);
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
                return this.isValidEmail;
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
        if (this.registrationUtils.getCurrentPage() === 1) {
            return this.sendVerificationEmail();
        }
        if (this.registrationUtils.getCurrentPage() === 2) {
            return this.validateVerificationCode();
        }
        if (this.registrationUtils.getCurrentPage() === 3) {
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
        this._bluiSecurityService.updateSecurityState({ registrationEmail: '', registrationPassword: '' });
        this.registrationUtils.clearAccountDetails();
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    getUserName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    getCustomEmailValidator(): ValidatorFn {
        return this.customEmailValidator || this._bluiAuthConfig.customEmailValidator;
    }
}
