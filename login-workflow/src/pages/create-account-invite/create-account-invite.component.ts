import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { ErrorStateMatcher } from '@angular/material/core';
import { LOGIN_ROUTE } from '../../auth/auth.routes';

import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbRegisterUIService } from '../../services/api/register-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../../services/state/auth-security.service';
import { PxbCreateAccountInviteErrorDialogService } from './dialog/create-account-invite-error-dialog.service';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}

@Component({
    selector: 'pxb-create-account-invite',
    templateUrl: './create-account-invite.component.html',
    styleUrls: ['./create-account-invite.component.scss'],
})
export class PxbCreateAccountInviteComponent implements OnInit {
    pageCount = 4;
    currentPageId: number;

    emailMatcher = new AuthErrorStateMatcher();
    errorMatcher = new CrossFieldErrorMatcher();

    passwordFormGroup: FormGroup;
    firstNameFormControl: FormControl;
    lastNameFormControl: FormControl;
    phoneNumberFormControl: FormControl;

    passLength = false;
    specialFlag = false;
    numberFlag = false;
    upperFlag = false;
    lowerFlag = false;
    confirmAgreement = false;
    confirmPasswordFocused = false;
    newPasswordVisible = false;
    confirmPasswordVisible = false;

    isValidRegistrationLink = false;
    hasEulaLoadError = false;
    isLoading = true;

    licenseAgreement: string;

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

        this.passwordFormGroup = this._formBuilder.group(
            {
                newPassword: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: this.checkPasswords,
            }
        );
    }

    ngOnInit(): void {
        this.currentPageId = 0;

        this.firstNameFormControl = new FormControl('', Validators.required);
        this.lastNameFormControl = new FormControl('', Validators.required);
        this.phoneNumberFormControl = new FormControl('');
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
        const firstName = this.firstNameFormControl.value;
        const lastName = this.lastNameFormControl.value;
        const phoneNumber = this.phoneNumberFormControl.value;
        const password = this.passwordFormGroup.value.confirmPassword;
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .completeRegistration(firstName, lastName, phoneNumber, password)
            .then(() => {
                this._pxbSecurityService.setLoading(false);
                this.next();
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

    toggleNewPasswordVisibility(): void {
        this.newPasswordVisible = !this.newPasswordVisible;
    }

    toggleConfirmPasswordVisibility(): void {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }

    checkPasswordStrength(password: string): void {
        this.passLength = /^.{8,16}$/.test(password);
        this.specialFlag = /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+/.test(password);
        this.numberFlag = /[0-9]/.test(password);
        this.upperFlag = /[A-Z]/.test(password);
        this.lowerFlag = /[a-z]/.test(password);
    }

    checkPasswords(group: FormGroup): any {
        const pass = group.get('newPassword').value;
        const confirmPass = group.get('confirmPassword').value;
        return pass === confirmPass ? null : { passwordsDoNotMatch: true };
    }

    getSuccessEmptyStateTitle(): string {
        return `Welcome, ${this.firstNameFormControl.value} ${this.lastNameFormControl.value}!`;
    }

    getSuccessEmptyStateDescription(): string {
        return `Your account has been successfully created with the email ${
            this._pxbSecurityService.getSecurityState().email
        }. Your account has already been added to the organization. Press Continue below to finish.`;
    }

    canContinue(): boolean {
        switch (this.currentPageId) {
            case 0:
                return !this.confirmAgreement;
            case 1:
                return !(
                    this.passwordFormGroup.get('newPassword').value &&
                    this.passLength &&
                    this.specialFlag &&
                    this.numberFlag &&
                    this.upperFlag &&
                    this.lowerFlag &&
                    this.passwordFormGroup.get('confirmPassword').value &&
                    this.passwordFormGroup.valid
                );
            case 2:
                return !(
                    this.firstNameFormControl.value &&
                    this.firstNameFormControl.valid &&
                    this.lastNameFormControl.value &&
                    this.lastNameFormControl.valid
                );
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
